const addFixedLength = obj =>
  Object.assign(obj, {
    fixedLength: bytes => ({
      name: 'stringFixedLength',
      bytes,
      method: (bufName, varName, offset) =>
        `${bufName}.write(${varName}, ${offset});`,
    }),
  });

module.exports = addFixedLength({
  name: 'string',
  bytes: 0,
  method: (bufName, varName, offset) =>
    `let sLen = ${varName}.length; let utf8B = Buffer.allocUnsafe(sLen + 1); utf8B.writeUInt8(sLen, 0);utf8B.write(${varName}, 1); ${bufName} = Buffer.concat([${bufName}, utf8B]);console.log(${bufName});`,
});
