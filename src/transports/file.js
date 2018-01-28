const fs = require('fs');

module.exports = location => ({
  init: () => fs.createWriteStream(location),
  log: (hexlogStream, val) =>
    hexlogStream.write(val),
});