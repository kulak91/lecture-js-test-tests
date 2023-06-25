const filterTests = (tests, prefix) => {
	return tests.reduce((testFromTestSuit, testSuit) => {
		return [...testFromTestSuit, ...testSuit.assertionResults.filter(test => test.fullName.startsWith(prefix))]
	}, []);
};

module.exports = filterTests;
