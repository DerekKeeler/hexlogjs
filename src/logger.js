const schema = require('./schema');

const getDate = (() => {
  let date;

  return () => {
    if (!date) {
      date = Date.now();
      setImmediate(() => {
        date = null;
      });
    }

    return date;
  };
})();

module.exports = class Logger {
  constructor(opts) {
    this.transports = {};
    this.transportsInit = {};
    this._logLevel = 7;
    this.getDate = opts && opts.lowResolutionTime ? getDate : Date.now;

    this.defineTransportFn();
  }

  defineSchema(level, definedSchema) {
    return {
      level: level[0],
      schema: schema(Object.assign({}, definedSchema, { level: level[1] })),
    };
  }

  defineTransportFn() {
    const fnBody = Object.keys(this.transports).reduce((col, key) => {
      return (
        col +
        `(${this.transports[
          key
        ].log.toString()})(this.transportsInit.${key}, loggerVal);`
      );
    }, '');

    this.transportFn = new Function('loggerVal', fnBody).bind(this);
  }

  log(schemaObj, vals) {
    if (this.logLevel > schemaObj.level) {
      // @todo: Pass in timestamp
      // this.getDate();
      this.transportFn(schemaObj.schema(vals));
    }
  }

  set logLevel(val) {
    if (typeof val === 'number') {
      this._logLevel = val;
    }
  }

  get logLevel() {
    return this._logLevel;
  }

  addTransport(name, transport) {
    if (this.transports[name]) {
      throw new Error(`transport ${name} already exists`);
    }

    this.transports[name] = transport;

    if (typeof transport.init === 'function') {
      this.transportsInit[name] = transport.init();
    }

    this.defineTransportFn();
  }

  removeTransport(name) {
    if (this.transports[name]) {
      delete this.transports[name];
      this.defineTransportFn();
    }
  }
};
