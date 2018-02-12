const fs = require('fs');

const schemas = {};

module.exports = (location, filename) => ({
  init: () => fs.createWriteStream(location + filename),
  header: (hexlogStream, schemaId, schema) => {
    schemas[schemaId] = schema;
    fs.writeFileSync(location + 'header.json', JSON.stringify(schemas));
  },
  log: (hexlogStream, val) =>
    hexlogStream.write(val),
});
