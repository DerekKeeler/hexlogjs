const int48 = require('../../src/types/int48');

describe('types.int48', () => {
  it('should have a name', () => {
    expect(int48.name).toBe('int48');
  });

  it('should have a byte size', () => {
    expect(int48.bytes).toBe(6);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(int48.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${int48.bytes}); ${int48.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(120).readIntLE(0, 6)).toEqual(120);
      expect(fn(18).readIntLE(0, 6)).toEqual(18);
      expect(fn(-120).readIntLE(0, 6)).toEqual(-120);
    });
  
    it('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${int48.bytes}); ${int48.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn('test').readIntLE(0, 6)).toEqual(0);
      expect(fn(null).readIntLE(0, 6)).toEqual(0);
      expect(fn({}).readIntLE(0, 6)).toEqual(0);
      expect(fn().readIntLE(0, 6)).toEqual(0);
    });
  });
});
