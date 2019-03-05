const ParseServer = require('parse-server').ParseServer;
const app = require('../index');
const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'https://aa48465d94db43efa5850cecddcae42f@sentry.io/1408339' });

const report = error => {
	if (error) {
		Sentry.captureException(error);
	}
};

module.exports = { report };
