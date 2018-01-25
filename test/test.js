const {types, Logger} = require('../src');

const logger = new Logger();
const spec = logger.defineSchema(types.levels.info, {
  fps: types.double,
});

logger.addTransport('console', val => console.log(val));
logger.removeTransport('default');

logger.log(spec, {fps: +((Math.random() * 100).toFixed(2))});
