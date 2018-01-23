module.exports = {
  name: 'uInt8',
  bytes: 1,
  method: (bufName, varName, offset) =>
    `${bufName}.writeUInt8(${varName}, ${offset});`,
};
