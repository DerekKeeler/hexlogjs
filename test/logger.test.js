const Logger = require('../src/logger');
const types = require('../src/types');

describe('Logger', () => {
  let logger;

  beforeEach(() => logger = new Logger());

  it('can be newed', () => {
    expect(new Logger()).toBeInstanceOf(Logger);
  });

  it('logLevel defaults to debug', () => {
    expect(logger.logLevel).toEqual(types.levels.debug[0]);
  });

  it('logLevel can be set as number', () => {
    logger.logLevel = 5;
    expect(logger.logLevel).toEqual(5);
  });

  // @todo: Make this true
  it.skip('logLevel can be set as level type');

  // @todo: Make this true
  it.skip('logLevel can be set as string matching level');

  it('logLevel can not be set as a non-number', () => {
    ['test', true, undefined, null, {}]
    .forEach(val => {
      logger.logLevel = val;
      expect(logger.logLevel).toEqual(types.levels.debug[0]);
    });
  });

  describe('#defineSchema', () => {
    it.skip('throws an error if an invalid level is provided');

    it.skip('throws an error if an invalid schema is provided');

    it.skip('returns an object');
  });

  describe.skip('#defineTransportFn', () => {
    it.skip('includes all defined transports');
    it.skip('sets transportFn');
  });

  describe.skip('#log');

  describe.skip('#addTransport');

  describe.skip('#removeTransport');
});
