const uInt16 = require('../../src/types/uint16');

describe('types.int16', () => {
  it('should have a name', () => {
    expect(uInt16.name).toBe('uInt16');
  });

  it('should have a byte size', () => {
    expect(uInt16.bytes).toBe(2);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(uInt16.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${uInt16.bytes}); ${uInt16.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(120).readUInt16LE(0)).toEqual(120);
      expect(fn(18).readUInt16LE(0)).toEqual(18);
    });
  
    it('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${uInt16.bytes}); ${uInt16.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn('test').readUInt16LE(0)).toEqual(0);
      expect(fn(null).readUInt16LE(0)).toEqual(0);
      expect(fn({}).readUInt16LE(0)).toEqual(0);
      expect(fn().readUInt16LE(0)).toEqual(0);
    });
  });
});
