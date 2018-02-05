const float = require('../../src/types/float');

describe('types.float', () => {
  it('should have a name', () => {
    expect(float.name).toBe('float');
  });

  it('should have a byte size', () => {
    expect(float.bytes).toBe(4);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(float.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${float.bytes}); ${float.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(14.5).readFloatLE(0)).toEqual(14.5);
      expect(fn(18).readFloatLE(0)).toEqual(18);
      expect(fn(-18908008).readFloatLE(0)).toEqual(-18908008);
    });
  
    it('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${float.bytes}); ${float.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn('test').readFloatLE(0)).toEqual(NaN);
      expect(fn(null).readFloatLE(0)).toEqual(0);
      expect(fn({}).readFloatLE(0)).toEqual(NaN);
      expect(fn().readFloatLE(0)).toEqual(NaN);
    });
  });
});
