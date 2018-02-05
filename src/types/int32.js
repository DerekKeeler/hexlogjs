module.exports = {
  name: 'int32',
  bytes: 4,
  method: (bufName, varName, offset) =>
    `${bufName}.writeInt32LE(${varName}, ${offset});`,
};
