const double = require('../../src/types/double');

describe('types.double', () => {
  it('should have a name', () => {
    expect(double.name).toBe('double');
  });

  it('should have a byte size', () => {
    expect(double.bytes).toBe(8);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(double.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${double.bytes}); ${double.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(14.5555).readDoubleLE(0)).toEqual(14.5555);
      expect(fn(18).readDoubleLE(0)).toEqual(18);
      expect(fn(-18908008).readDoubleLE(0)).toEqual(-18908008);
    });
  
    it('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${double.bytes}); ${double.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn('test').readDoubleLE(0)).toEqual(NaN);
      expect(fn(null).readDoubleLE(0)).toEqual(0);
      expect(fn({}).readDoubleLE(0)).toEqual(NaN);
      expect(fn().readDoubleLE(0)).toEqual(NaN);
    });
  });
});
