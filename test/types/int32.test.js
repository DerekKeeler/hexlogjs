const int32 = require('../../src/types/int32');

describe('types.int32', () => {
  it('should have a name', () => {
    expect(int32.name).toBe('int32');
  });

  it('should have a byte size', () => {
    expect(int32.bytes).toBe(4);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(int32.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${int32.bytes}); ${int32.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(120).readInt32LE(0)).toEqual(120);
      expect(fn(18).readInt32LE(0)).toEqual(18);
      expect(fn(-120).readInt32LE(0)).toEqual(-120);
    });
  
    it('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${int32.bytes}); ${int32.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn('test').readInt32LE(0)).toEqual(0);
      expect(fn(null).readInt32LE(0)).toEqual(0);
      expect(fn({}).readInt32LE(0)).toEqual(0);
      expect(fn().readInt32LE(0)).toEqual(0);
    });
  });
});
