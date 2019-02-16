const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// Route Imports
const signIn = require('./routes/signIn');
const signUp = require('./routes/signUp');
const newProperty = require('./routes/newProperty');
const property = require('./routes/property');
const authorities = require('./routes/authorities');

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

// Routes
app.use('/signIn', signIn);
app.use('/signUp', signUp);
app.use('/newProperty', newProperty);
app.use('/property', property);
app.use('/authorities', authorities);

const port = process.env.PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, () => console.log('khaya API running on port ' + port + '.'));
