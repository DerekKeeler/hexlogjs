const id = require('./id');

module.exports = definedSchema => {
  // Start with one to account for the 8-bit CRC at the start of the function
  let bufSize = 1;
  let crcString = '';

  const fnString = Object.keys(definedSchema).reduce((col, key) => {
    if (!definedSchema[key] || typeof definedSchema[key] !== 'object') {
      // @todo: Should be saved as part of schema
      return col;
    }

    // Defined types should contain enough info to generate a function from
    const { name: typeName, bytes, method } = definedSchema[key];
    crcString += `${key}${typeName}`;
    col += method('buf', `msg.${key}`, bufSize);
    bufSize += bytes;

    return col;
  }, '');

  const schemaId = id(crcString);
  return new Function(
    'msg',
    `let buf = Buffer.allocUnsafe(${bufSize});buf[0] = ${schemaId}; ${fnString}; return buf;`
  );
};
