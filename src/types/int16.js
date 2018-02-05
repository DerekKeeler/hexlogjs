module.exports = {
  name: 'int16',
  bytes: 2,
  method: (bufName, varName, offset) =>
    `${bufName}.writeInt16LE(${varName}, ${offset});`,
};
