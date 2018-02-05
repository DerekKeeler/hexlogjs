const uInt8 = require('../../src/types/uint8');

describe('types.uInt8', () => {
  it('should have a name', () => {
    expect(uInt8.name).toBe('uInt8');
  });

  it('should have a byte size', () => {
    expect(uInt8.bytes).toBe(1);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(uInt8.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${uInt8.bytes}); ${uInt8.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(120).readUInt8(0)).toEqual(120);
      expect(fn(18).readUInt8(0)).toEqual(18);
    });
  
    it('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${uInt8.bytes}); ${uInt8.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn('test').readUInt8(0)).toEqual(0);
      expect(fn(null).readUInt8(0)).toEqual(0);
      expect(fn({}).readUInt8(0)).toEqual(0);
      expect(fn().readUInt8(0)).toEqual(0);
    });
  });
});
