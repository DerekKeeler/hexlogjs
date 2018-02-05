module.exports = input => {
  if (typeof input !== 'string') {
    throw new Error('Input not a string');
  }

  const buf = Buffer.from(input);

  let accum = 0;

  for (let index = 0, len = buf.length; index < len; index++) {
    const byte = buf[index];
    accum += byte;
  }

  return `0x${(accum % 256).toString(16)}`;
};
