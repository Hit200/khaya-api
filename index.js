const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

const databaseUri = 'mongodb://localhost:27017/khaya-parse' // process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
	console.log('DATABASE_URI not specified, falling back to localhost.');
}

const api = new ParseServer({
	databaseURI: databaseUri,
	cloud:  __dirname + '/cloud/main.js',
	serverURL:  'http://localhost:1337/parse', 
	appId: 'parse-khaya-app-ID',
	masterKey: 'parse-khaya-master-KEY'
});
const app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';

// Parse middleware
app.use(mountPath, api);

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

app.post('/signUp', async (req, res) => {
  const {name, gender, email, phone, address, school, registrationId, password} = req.body;
  
  const user = new Parse.User();
  user.set('name', name);
  user.set('username', email);
  user.set('email', email);
  user.set('gender', gender);
  user.set('phone', phone);
  user.set('address', address);
  user.set('school', school);
  user.set('registrationId', registrationId);
  user.set('password', password);

  try{
    const response = await user.signUp();
    res.json({success : true, profile : response});
  }
  catch(error){res.json({success : false, error : error.message})}
})


app.post('/signIn', async (req, res) => {
  const {username, password} = req.body;

  try{
  const profile = await Parse.User.logIn(username, password);
  res.json({success: true, profile});
  }
  catch(error){
    res.json({success: false, error: error.message})
  }
})

app.post('/newProperty', async (req, res) => {
  const {address, features, sharing, media, room, description, owner } = req.body;

  const Properties = Parse.Object.extend('Properties');
  const property = new Properties();

  property.save({
   owner,
   description,
   address,
   features,
   sharing,
   verified : false,
   media,
   room,
   ratings : [0, 0, 0, 0, 0],
   overallRating : 0
  })
  .then((property) => res.json({success : true, id : property.id}))
  .catch((error) => {
    console.error(error)
    return res.json({success : false})
  })
})



const port = process.env.PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
	console.log('parse-server-example running on port ' + port + '.');
});

ParseServer.createLiveQueryServer(httpServer);