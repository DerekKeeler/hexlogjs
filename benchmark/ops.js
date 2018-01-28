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
mkdirp(winstonLocation);
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
mkdirp(pinoLocation);
const pinoLog = pino(fs.createWriteStream(pinoLocation + filename));
// Log to make sure that the file is created before our test
pinoLog.info({fps: 'test'});

// Setup hexlogjs
const hexlogjsLocation = `${appDir}/log-output/hexlogjs/`;
mkdirp(hexlogjsLocation);
const hexlogjs = new HexLogger();
const spec = hexlogjs.defineSchema(types.levels.info, {
  fps: types.string.fixedLength(4),
});

hexlogjs.addTransport('writestream', transports.file(hexlogjsLocation + filename));
// Log to make sure that the file is created before our test
hexlogjs.log(spec, {fps: 'test'});


const suite = new Benchmark.Suite;

// add tests
suite.add('Winston', function() {
  winstonLog.info({fps: 'test'});
})
.add('Pino', function() {
  pinoLog.info({fps: 'test'});
})
.add('hexlogjs', function() {
  hexlogjs.log(spec, {fps: 'test'});
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));

  //Clean up after tests
  rimraf.sync(`${appDir}/log-output`);
})
// run async
.run({ 'async': true });