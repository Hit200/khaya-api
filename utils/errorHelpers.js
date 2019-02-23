const report = error =>
	Parse.Analytics.track('error', { code: error.code, message: error.message });

module.exports = { report };
