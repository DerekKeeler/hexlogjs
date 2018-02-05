module.exports = {
  name: 'int8',
  bytes: 1,
  method: (bufName, varName, offset) =>
    `${bufName}.writeInt8(${varName}, ${offset});`,
};
