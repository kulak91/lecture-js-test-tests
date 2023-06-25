const fs = require('fs');
const path = require('path');
const render = require('./render');
const calculateScores = require('./calculateScores');
const { readReport } = require('../helpers/helpers');
const scores = require('./scores');

const TOKEN = process.argv[2];
const LANGUAGE = process.argv[3] && process.argv[3].toLowerCase();

const langMap = {
  'ua': 'ua',
  'en': 'en',
}
const language = langMap[LANGUAGE] || 'ua';
const localization = require(`./localization/${language}`);

try {
  const maxScore = 9;
  const testResult = readReport('../report.json');
  const calculatedResult = calculateScores(testResult.testResults, scores, maxScore);
  const mark = Number(calculatedResult.stats.score).toFixed(1);
  const generatedFeedback = render.feedback(localization, calculatedResult);
  const trace = render.trace(localization, calculatedResult);

  writeResult({
    mark,
    generatedFeedback,
    trace
  });
} catch (error) {
  writeResult({
    errorCode: 1001,
    errorDescription: error.message
  });
}

function writeResult(result) {
  const resultsPath = path.resolve(__dirname, '../result.json');
  fs.writeFileSync(
    resultsPath,
    JSON.stringify({
      token: TOKEN,
      buildNumber: `${process.env.BUILD_NUMBER || ''}`,
      ...result
    }, null, 4),
    { flag: 'w+' }
  );
}
