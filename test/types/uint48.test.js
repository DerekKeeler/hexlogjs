const uInt48 = require('../../src/types/uint48');

describe('types.uInt48', () => {
  it('should have a name', () => {
    expect(uInt48.name).toBe('uInt48');
  });

  it('should have a byte size', () => {
    expect(uInt48.bytes).toBe(6);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(uInt48.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${uInt48.bytes}); ${uInt48.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(120).readUIntLE(0, 6)).toEqual(120);
      expect(fn(18).readUIntLE(0, 6)).toEqual(18);
    });
  
    it('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${uInt48.bytes}); ${uInt48.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn('test').readUIntLE(0, 6)).toEqual(0);
      expect(fn(null).readUIntLE(0, 6)).toEqual(0);
      expect(fn({}).readUIntLE(0, 6)).toEqual(0);
      expect(fn().readUIntLE(0, 6)).toEqual(0);
    });
  });
});
