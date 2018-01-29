const schema = require('../src/schema');

describe('schema', () => {
  it('should only allow valid schemas', () => {
    expect(schema).toThrowError('Invalid schema');
  });

  it('should only allow valid types', () => {
    expect(() => schema({
      testOne: {
        name: 'test',
        bytes: 1,
        method: () => '',
      },
      testTwo: {},
    })).toThrowError('Invalid type used: testTwo');
  });

  it('should return a valid function', () => {
    const returned = schema({
      test: {
        name: 'double',
        bytes: 8,
        method: (bufName, varName, offset) =>
          `${bufName}.writeDoubleLE(${varName}, ${offset});`,
      }
    });
    const fnString = returned.toString();
    const fnBody = fnString.substring(fnString.indexOf("{") + 1, fnString.lastIndexOf("}")).trim();

    expect(returned).toBeInstanceOf(Function);
    expect(fnBody).toEqual('let buf = Buffer.allocUnsafe(9); buf[0] = 0x3b; buf.writeDoubleLE(msg.test, 1);; return buf;');
  });
});
