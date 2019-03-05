const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

const api = new ParseServer({
	databaseURI: process.env.DATABASE_URI,
	cloud: __dirname + '/cloud/main.js',
	serverURL: process.env.SERVER_URL,
	appId: process.env.APP_ID,
	masterKey: process.env.MASTER_KEY,
	appName: 'Khaya',
	emailAdapter: {
		module: 'parse-server-simple-mailgun-adapter',
		options: {
			fromAddress: process.env.FROM_ADDRESS,
			domain: process.env.MAILGUN_DOMAIN,
			apiKey: process.env.MAILGUN_API_KEY
		}
	},
	publicServerURL: process.env.PUBLIC_SERVER_URL
});

const options = { allowInsecureHTTP: false };

const dashboard = new ParseDashboard(
	{
		apps: [
			{
				serverURL: process.env.SERVER_URL,
				appId: process.env.APP_ID,
				masterKey: process.env.MASTER_KEY,
				appName: 'Khaya'
			}
		],
		users: [
			{
				user: process.env.USER,
				pass: process.env.PASS
			}
		],
		trustProxy: 1
	},
	options
);

const mountPath = process.env.MOUNT_PATH;
module.exports = app = express();

// Middleware
app.use(
	cors({
		origin: 'http://localhost',
		optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
	})
);
app.use(mountPath, api);
app.use('/dashboard', dashboard);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
	fileUpload({
		limits: { fileSize: 10 * 1024 * 1024 } // 10 MB file limit
	})
);

// Routes
app.use('/signIn', require('./routes/signIn'));
app.use('/signUp', require('./routes/signUp'));
app.use('/newProperty', require('./routes/newProperty'));
app.use('/property', require('./routes/property'));
app.use('/authorities', require('./routes/authorities'));
app.use('/signOut', require('./routes/signOut'));
app.use('/resetPassword', require('./routes/resetPassword'));

const port = process.env.PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, () => console.log('khaya API running on port ' + port + '. \n'));
