module.exports = {
  name: 'int48',
  bytes: 6,
  method: (bufName, varName, offset) =>
    `${bufName}.writeIntLE(${varName}, ${offset}, 6);`,
};
