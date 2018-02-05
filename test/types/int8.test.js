const int8 = require('../../src/types/int8');

describe('types.int8', () => {
  it('should have a name', () => {
    expect(int8.name).toBe('int8');
  });

  it('should have a byte size', () => {
    expect(int8.bytes).toBe(1);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(int8.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${int8.bytes}); ${int8.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(120).readInt8(0)).toEqual(120);
      expect(fn(18).readInt8(0)).toEqual(18);
      expect(fn(-120).readInt8(0)).toEqual(-120);
    });
  
    it('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${int8.bytes}); ${int8.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn('test').readInt8(0)).toEqual(0);
      expect(fn(null).readInt8(0)).toEqual(0);
      expect(fn({}).readInt8(0)).toEqual(0);
      expect(fn().readInt8(0)).toEqual(0);
    });
  });
});
