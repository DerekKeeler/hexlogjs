module.exports = {
  name: 'uInt32',
  bytes: 4,
  method: (bufName, varName, offset) =>
    `${bufName}.writeUInt32LE(${varName}, ${offset});`,
};
