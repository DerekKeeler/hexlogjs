const fs = require('fs');

const schemas = {};
const types = {
  float: {
    decode: (bufName, offsetVal) => `${bufName}.readFloatLE(${offsetVal})`,
  },
  double: {
    decode: (bufName, offsetVal) => `${bufName}.readDoubleLE(${offsetVal})`,
  },
  stringFixed: {
    // decode: (buf, offset, length) => `"${buf.toString('utf-8', offset, offset + length)}"`,
  },
  string: {
    // decode: (buf, offset) => {
    //   const length = buf.readUInt8(offset);
    //   return `"${buf.toString('utf-8', ++offset, offset + length)}"`;
    // }
  },
  uInt48: {
    decode: (bufName, offsetVal) => `${bufName}.readUIntLE(${offsetVal}, 6)`,
  }
};

const addStringEnd = (length, i, str) => ++i < length ? str + ',' : str;

module.exports = (location, filename) => ({
  init: () => ({
    stream: fs.createWriteStream(location + filename),
    schemas,
    types,
  }),
  header: (hexlogStream, schemaId, schema) => {
    // Start at 1 to account for the first byte being the schema ID
    let offset = 1;

    const schemaKeys = Object.keys(schema);
    const schemaLength = schemaKeys.length;

    const fnString = schemaKeys.reduce((col, key, i) => {
      if (typeof schema[key] === 'undefined') {
        return col;
      }

      let fnVal = '';

      if (typeof schema[key] !== 'object') {
        fnVal = typeof schema[key] === 'string' ? `"${schema[key]}"` : schema[key];
      } else {
        const {name} = schema[key];
        fnVal = `\${${
          types[name].decode('buf', `offset + ${offset}`, `offset + ${offset + schema[key].bytes}`)
        }}`;

        offset += schema[key].bytes;
      }

      return col += addStringEnd(schemaLength, i, `"${key}":${fnVal}`);
    }, '');

    schemas[schemaId] = new Function('buf', 'types', `let offset = 0; return \`{${fnString}}\n\`;`);
    console.log(schemas[schemaId].toString());
  },
  log: ({schemas, stream, types}, buf) => {
    const val = schemas[buf[0]](buf, types);

    stream.write(val);
  },
});
