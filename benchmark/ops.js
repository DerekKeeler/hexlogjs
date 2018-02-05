const Benchmark = require('benchmark');
const pino = require('pino');
const winston = require('winston');
const {types, Logger: HexLogger, transports} = require('../src');
const fs = require('fs');
const rimraf = require('rimraf');

const mkdirp = require('mkdirp');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const filename = `test-${Date.now()}.log`;

// Setup Winston
const winstonLocation = `${appDir}/log-output/winston/`;
mkdirp.sync(winstonLocation);
const winstonLog = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.File)({ filename: winstonLocation + filename })
  ]
});
// Log to make sure that the file is created before our test
winstonLog.info({fps: 'test'});

// Setup Pino
const pinoLocation = `${appDir}/log-output/pino/`;
mkdirp.sync(pinoLocation);
const pinoLog = pino(fs.createWriteStream(pinoLocation + filename));
// Log to make sure that the file is created before our test
pinoLog.info({fps: 'test'});

// Setup hexlogjs
const hexlogjsLocation = `${appDir}/log-output/hexlogjs/`;
mkdirp.sync(hexlogjsLocation);
const hexlogjs = new HexLogger({
  lowResolutionTime: false
});
const spec = hexlogjs.defineSchema(types.levels.info, {
  fps: types.float,
  thing: 'yes',
  testString: types.string.fixedLength(4)
});

hexlogjs.addTransport('writestream', transports.file(hexlogjsLocation, filename));
// Log to make sure that the file is created before our test
hexlogjs.log(spec, {fps: 14.4, testString: 'test'});


const suite = new Benchmark.Suite;

// add tests
suite.add('Winston', function() {
  winstonLog.info({fps: 14.4, thing: 'yes', testString: 'test'});
})
.add('Pino', function() {
  pinoLog.info({fps: 14.4, thing: 'yes', testString: 'test'});
})
.add('hexlogjs', function() {
  hexlogjs.log(spec, {fps: 14.4, testString: 'test'});
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  const results = this.reduce((col, test) => {
    col[test.name] = test.hz;
    return col;
  }, {});

  Object.keys(results).forEach(loggerName => {
    if (loggerName !== 'hexlogjs') {
      console.log(`hexlogjs is faster than ${loggerName} by ${(results.hexlogjs / results[loggerName]).toFixed(2)}x`);
    }
  });

  //Clean up after tests
  rimraf.sync(`${appDir}/log-output`);
})
// run async
.run({ 'async': true, 'delay': 2 });