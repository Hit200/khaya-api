const firebase = require('firebase');
require('firebase/storage');
const uuidv4 = require('uuid/v4');
global.XMLHttpRequest = require('xhr2');

const config = {
	apiKey: process.env.FIRE_API_KEY,
	authDomain: process.env.FIRE_AUTH_DOMAIN,
	databaseURL: process.env.FIRE_DATABASE_URL,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET
};
firebase.initializeApp(config);

const postToFirebase = async files => {
	if (files.constructor === Object) {
		return [await retrieveImageUrl(files.data, files.name.split('.').pop())];
	} else if (files.constructor === Array) {
		let imageArray = [];
		for (let i of files) {
			imageArray.push(await retrieveImageUrl(i.data, i.name.split('.').pop()));
		}
		return imageArray;
	}
};

const retrieveImageUrl = async (file, extension) => {
	try {
		let storageRef = firebase.storage().ref(`images/${uuidv4()}.${extension}`);
		let data = await storageRef.put(file).then(async () => await storageRef.getDownloadURL());
		return data;
	} catch (error) {
		console.error(error);
	}
};

module.exports = { postToFirebase };
