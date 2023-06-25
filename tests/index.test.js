
const { filterTests, readReport } = require('../helpers/helpers');

const UNIT_TESTS_AMOUNT = 11;
const report = readReport('../tmp/report.json');

describe('UNIT_TESTS', () => {
  const unitTests = filterTests(report.testResults, 'CartParser - unit tests');

  [...Array(UNIT_TESTS_AMOUNT).keys()].forEach((number, index) => {
    it(`UNIT_TEST_${index + 1}`, () => {
      expect(unitTests[number]).not.toBe(undefined);
      expect(unitTests[number]).toHaveProperty("status");
      expect(unitTests[number].status).toBe('passed')
    })
  });
});

describe('INTEGRATION_TEST', () => {
  const integrationTest = filterTests(report.testResults, 'CartParser - integration test')[0];

  it('HAS_INTEGRATION_TEST', () => {
    expect(integrationTest).not.toBe(undefined);
    expect(integrationTest.status).toBe('passed');
  })
})

describe('TOTAL_TESTS_AMOUNT', () => {
  it('HAS_PROPER_AMOUNT_OF_TESTS', () => {
    expect(report.testResults[0].assertionResults.length).toBeLessThanOrEqual(12);
  })

})
