const bool = require('../../src/types/bool');

describe('types.bool', () => {
  it('should have a name', () => {
    expect(bool.name).toBe('bool');
  });

  it('should have a byte size', () => {
    expect(bool.bytes).toBe(1);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(bool.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${bool.bytes}); ${bool.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(true).readUInt8(0)).toEqual(1);
      expect(fn(false).readUInt8(0)).toEqual(0);
    });
  
    it('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${bool.bytes}); ${bool.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn('test').readUInt8(0)).toEqual(1);
      expect(fn(null).readUInt8(0)).toEqual(0);
      expect(fn({}).readUInt8(0)).toEqual(1);
      expect(fn().readUInt8(0)).toEqual(0);
    });
  });
});
