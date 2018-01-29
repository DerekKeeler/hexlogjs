module.exports = input => {
  if (typeof input !== 'string') {
    throw new Error('Input not a string');
  }

  const buf = Buffer.from(input);

  let crc = 0;
  let accum = 0;

  for (let index = 0, len = buf.length; index < len; index++) {
    const byte = buf[index];
    accum += byte;
  }

  crc += accum % 256;

  return `0x${(crc % 256).toString(16)}`;
};
