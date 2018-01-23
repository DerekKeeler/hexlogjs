module.exports = {
  name: 'double',
  bytes: 8,
  method: (bufName, varName, offset) =>
    `${bufName}.writeDoubleLE(${varName}, ${offset});`,
};
