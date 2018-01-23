module.exports = {
  name: 'bool',
  bytes: 1,
  method: (bufName, varName, offset) => `${bufName}[${offset}] = !!${varName};`,
};
