const Benchmark = require('benchmark');
const pino = require('pino');
const winston = require('winston');
const hexlogjs = require('../src');

const suite = new Benchmark.Suite;

// add tests
suite.add('Winston', function() {
  
})
.add('Pino', function() {

})
.add('hexlogjs', function() {

})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });