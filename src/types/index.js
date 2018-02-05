const levels = require('./levels');
const bool = require('./bool');
const double = require('./double');
const float = require('./float');
const string = require('./string');
const int8 = require('./int8');
const int16 = require('./int16');
const int32 = require('./int32');
const int48 = require('./int48');
const uint8 = require('./uint8');
const uint16 = require('./uint16');
const uint32 = require('./uint32');
const uint48 = require('./uint48');

module.exports = {
  levels,
  bool,
  double,
  number: double,
  float,
  string,
  int8,
  int16,
  int32,
  int48,
  uint8,
  uint16,
  uint32,
  uint48,
};
