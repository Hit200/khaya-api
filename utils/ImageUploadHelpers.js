const postToGrid = files => {
	if (files.constructor === Object) {
		return [].push(retrieveImageUrl(files.name, files.data, files.mimetype));
	} else if (files.constructor === Array) {
		let imageArray = [];
		for (let i of files) {
			imageArray.push(retrieveImageUrl(files.name, files.data, files.mimetype));
		}
		return imageArray;
	}
};

const retrieveImageUrl = (name, data, mimetype) => {
	const image = new Parse.File(name, { base64: data.toString('base64') }, mimetype);
	image
		.save()
		.then(upload => upload.url())
		.catch(error => console.log(error));
};

module.exports = { postToGrid, retrieveImageUrl };
