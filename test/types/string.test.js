const string = require('../../src/types/string');

describe('types.int16', () => {
  it('should have a name', () => {
    expect(string.name).toBe('string');
  });

  it('should have a byte size', () => {
    expect(string.bytes).toBe(0);
  });

  describe('#method', () => {
    it('should have a method', () => {
      expect(string.method).toBeInstanceOf(Function);
    });
  
    it('should modify the buffer with a valid value', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${string.bytes}); ${string.method('buf', 'msg', 0)}; return buf;`
      );
      const buf = fn('test string');
  
      expect(buf.readUInt8(0)).toEqual(11);
      expect(buf.toString('utf8', 1, 12)).toEqual('test string');
    });
  
    it.skip('should handle unexpected input', () => {
      const fn = new Function(
        'msg',
        `let buf = Buffer.allocUnsafe(${string.bytes}); ${string.method('buf', 'msg', 0)}; return buf;`
      );
  
      expect(fn(null).readUInt8(0)).toEqual(0);
      expect(fn({}).readUInt8(0)).toEqual(0);
      expect(fn().readUInt8(0)).toEqual(0);
    });
  });

  describe('#fixedLength', () => {
    const fixedLengthString = string.fixedLength(4);

    it('should have a name', () => {
      expect(fixedLengthString.name).toBe('stringFixedLength');
    });
  
    it('should have a byte size', () => {
      expect(fixedLengthString.bytes).toBe(4);
    });

    describe('#method', () => {
      it('should have a method', () => {
        expect(fixedLengthString.method).toBeInstanceOf(Function);
      });
    
      it('should modify the buffer with a valid value', () => {
        const fn = new Function(
          'msg',
          `let buf = Buffer.allocUnsafe(${fixedLengthString.bytes}); ${fixedLengthString.method('buf', 'msg', 0)}; return buf;`
        );
        const buf = fn('test');
    
        expect(buf.toString('utf8', 0)).toEqual('test');
      });
    
      it.skip('should handle unexpected input', () => {
        const fn = new Function(
          'msg',
          `let buf = Buffer.allocUnsafe(${fixedLengthString.bytes}); ${fixedLengthString.method('buf', 'msg', 0)}; return buf;`
        );
    
        expect(fn(null).readUInt8(0)).toEqual(0);
        expect(fn({}).readUInt8(0)).toEqual(0);
        expect(fn().readUInt8(0)).toEqual(0);
      });
    });
  });
});
