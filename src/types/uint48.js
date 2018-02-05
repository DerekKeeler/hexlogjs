module.exports = {
  name: 'uInt48',
  bytes: 6,
  method: (bufName, varName, offset) =>
    `${bufName}.writeUIntLE(${varName}, ${offset}, 6);`,
};
