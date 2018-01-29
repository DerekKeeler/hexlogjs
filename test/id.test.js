const id = require('../src/id');

describe('id', () => {
  it('should only accept a string', () => {
    expect(id).toThrowError('Input not a string');
    expect(() => id('testofvalues')).not.toThrowError();
    expect(() => id([])).toThrowError('Input not a string');
  });

  it('should return a hex code as a string', () => {
    expect(id('testofvalues')).toEqual('0x25');
  });
});
