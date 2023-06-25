const fs = require('fs');
const path = require('path');

const readReport = (file) => JSON.parse(fs.readFileSync(path.resolve(__dirname, file), 'utf-8').toString());

module.exports = readReport;
