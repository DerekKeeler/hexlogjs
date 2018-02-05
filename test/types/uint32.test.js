const uInt32 = require('../../src/types/uint32');

describe('types.int16', () => {
  it('should have a name', () => {
    expect(uInt32.name).toBe('uInt32');
  });

  it('should have a byte size', () => {
    expect(uInt32.bytes).toBe(4);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(uInt32.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${uInt32.bytes}); ${uInt32.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(120).readUInt32LE(0)).toEqual(120);
      expect(fn(18).readUInt32LE(0)).toEqual(18);
    });
  
    it('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${uInt32.bytes}); ${uInt32.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn('test').readUInt32LE(0)).toEqual(0);
      expect(fn(null).readUInt32LE(0)).toEqual(0);
      expect(fn({}).readUInt32LE(0)).toEqual(0);
      expect(fn().readUInt32LE(0)).toEqual(0);
    });
  });
});
