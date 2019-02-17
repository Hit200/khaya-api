const firebase = require('firebase');
require('firebase/storage');
const uuidv4 = require('uuid/v4');
global.XMLHttpRequest = require('xhr2');

const config = {
	apiKey: 'AIzaSyBNm0FMLEtUQ23mbjlKVqn8TaF0Isu7JGQ',
	authDomain: 'khaya-2019.firebaseapp.com',
	databaseURL: 'https://khaya-2019.firebaseio.com',
	projectId: 'khaya-2019',
	storageBucket: 'khaya-2019.appspot.com',
	messagingSenderId: '1011124471825'
};
firebase.initializeApp(config);

const postToFirebase = async files => {
	if (files.constructor === Object) {
		return [await retrieveImageUrl(files.data)];
	} else if (files.constructor === Array) {
		let imageArray = [];
		for (let i of files) {
			imageArray.push(await retrieveImageUrl(i.data));
		}
		return imageArray;
	}
};

const retrieveImageUrl = async file => {
	try {
		let storageRef = firebase.storage().ref(`images/${uuidv4()}.PNG`);
		let data = await storageRef.put(file).then(async () => await storageRef.getDownloadURL());
		return data;
	} catch (error) {
		console.error(error);
	}
};

module.exports = { postToFirebase };
