const ParseServer = require('parse-server').ParseServer;
const app = require('../index');

const report = error =>
	Parse.Analytics.track('error', { code: `${error.code}`, message: `${error.message}` });

module.exports = { report };
