const int16 = require('../../src/types/int16');

describe('types.int16', () => {
  it('should have a name', () => {
    expect(int16.name).toBe('int16');
  });

  it('should have a byte size', () => {
    expect(int16.bytes).toBe(2);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(int16.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${int16.bytes}); ${int16.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(120).readInt16LE(0)).toEqual(120);
      expect(fn(18).readInt16LE(0)).toEqual(18);
      expect(fn(-120).readInt16LE(0)).toEqual(-120);
    });
  
    it('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${int16.bytes}); ${int16.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn('test').readInt16LE(0)).toEqual(0);
      expect(fn(null).readInt16LE(0)).toEqual(0);
      expect(fn({}).readInt16LE(0)).toEqual(0);
      expect(fn().readInt16LE(0)).toEqual(0);
    });
  });
});
