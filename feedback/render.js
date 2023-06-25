const greetings = (localization, testResult) => {
	return localization.GREETINGS
		.replace(/\$\{total}/ig, `${+(testResult.stats.total.toFixed(2))}`);
};

const getMark = (stats) => `(${+stats.score.toFixed(2)} / ${+stats.total.toFixed(2)})`;

const icon = stats => stats && stats.score === stats.total ? '✔️' : '⚠️';

const perfectMark = stats => stats.score === stats.total ? '🎉' : '';

const renderTaskResult = (localization, testResult, depth = 1) => {
	const padding = '\n' + '    '.repeat(depth);

	if (testResult.message) {
		return padding;
	}

	if (testResult.stats.score === testResult.stats.total) {
		return '';
	}

	return padding + Object.keys(testResult.tests).map(key => {
		return `${icon(testResult.tests[key].stats)} ${localization[key]} ${renderTaskResult(
			localization,
			testResult.tests[key],
			depth + 1
		)}`;
	}).join(padding);
};

const renderBody = (localization, testResult) => {
	const tests = testResult.tests || {};

	return localization.GO_THROUGH_THE_LIST + '\n\n' + Object.keys(tests).map((task, i) => {
		return `${i + 1}) ${localization[task]} ${getMark(tests[task].stats)} ${perfectMark(tests[task].stats)}` + renderTaskResult(
			localization,
			tests[task],
		);
	}).join('\n');
};

const finalWords = (localization, testResult) => {
	let result = '';
	if (testResult.stats.score === testResult.stats.total) {
		result = localization.RESULT_PERFECT;
	} else if (testResult.stats.score > (testResult.stats.total * 0.6)) {
		result = localization.RESULT_GOOD;
	} else if (testResult.stats.score > 0) {
		result = localization.RESULT_BAD;
	} else {
		result = localization.RESULT_WORST;
	}

	return result
		.replace(/\$\{total}/ig, +testResult.stats.total.toFixed(2))
		.replace(/\$\{score}/ig, +testResult.stats.score.toFixed(2));
};

const feedback = (localization, testResult) => {
	if (testResult.stats.score <= 0) {
		return [
			greetings(localization, testResult),
			finalWords(localization, testResult)
		].join('\n\n');
	} else {
		return [
			greetings(localization, testResult),
			renderBody(localization, testResult),
			finalWords(localization, testResult)
		].join('\n\n');
	}
}

const trace = (localization, testResult) =>
	renderBody(localization, testResult) + '\n\n' +
	finalWords(localization, testResult);

module.exports = {
	feedback,
	trace
};
