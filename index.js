const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const api = new ParseServer({
	databaseURI: process.env.DATABASE_URI,
	cloud: __dirname + '/cloud/main.js',
	serverURL: process.env.SERVER_URL,
	appId: process.env.APP_ID,
	masterKey: process.env.MASTER_KEY
});

const mountPath = process.env.MOUNT_PATH;
const app = express();

// Middleware
app.use(mountPath, api);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 }
	})
);

// Routes
app.use('/signIn', require('./routes/signIn'));
app.use('/signUp', require('./routes/signUp'));
app.use('/newProperty', require('./routes/newProperty'));
app.use('/property', require('./routes/property'));
app.use('/authorities', require('./routes/authorities'));

const port = process.env.PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, () => console.log('khaya API running on port ' + port + '.'));
