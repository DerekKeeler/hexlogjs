module.exports = {
  name: 'uInt16',
  bytes: 2,
  method: (bufName, varName, offset) =>
    `${bufName}.writeUInt16LE(${varName}, ${offset});`,
};
