module.exports = {
  name: 'float',
  bytes: 4,
  method: (bufName, varName, offset) =>
    `${bufName}.writeFloatLE(${varName}, ${offset});`,
};
