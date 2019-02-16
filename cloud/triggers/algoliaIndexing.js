const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY);
const index = client.initIndex('Properties');

Parse.Cloud.afterSave('Properties', request => {
	const objectToSave = request.object.toJSON();
	objectToSave.objectID = objectToSave.objectId;
	index.saveObject(objectToSave, (err, content) => {
		if (err) {
			throw err;
		}
		console.log('Parse<>Algolia object saved');
	});
});

Parse.Cloud.afterDelete('Properties', request => {
	var objectID = request.object.id;
	index.deleteObject(objectID, (err, content) => {
		if (err) {
			throw err;
		}
		console.log('Parse<>Algolia object deleted');
	});
});
