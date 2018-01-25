const schema = require('./schema');

module.exports = class Logger {
  constructor() {
    this.transports = {
      default: val => val
    };
  
    this._logLevel = 7;

    this.defineTransportFn();
  }

  defineSchema(level, definedSchema) {
    return {
      level: level[0],
      schema: schema(Object.assign({}, definedSchema, {level: level[1]})),
    };
  }

  defineTransportFn() {
    const fnBody = Object.keys(this.transports)
    .reduce((col, key) =>
      col + `(${this.transports[key].toString()})(fn);`
    , '');

    this.transportFn = new Function('fn', fnBody);
  }

  log(schemaObj, vals) {
    if(this.logLevel > schemaObj.level) {      
      this.transportFn(schemaObj.schema(vals));
    }
  }

  set logLevel(val) {
    this._logLevel = val;

    this.redefineLevels();
  }

  get logLevel() {
    return this._logLevel;
  }

  addTransport(name, transport) {
    if(this.transports[name]) {
      throw new Error(`transport ${name} already exists`);
    }

    this.transports[name] = transport;
    this.defineTransportFn();
  }

  removeTransport(name) {
    if(this.transports[name]) {
      delete this.transports[name];
      this.defineTransportFn();
    }
  }
}
