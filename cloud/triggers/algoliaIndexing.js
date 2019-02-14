var algoliasearch = require('algoliasearch');
var client = algoliasearch('D97UPSIQ04', 'd2b5cc046c9beb330294440a7b6d74a4');
var index = client.initIndex('Properties');

Parse.Cloud.afterSave('Properties', request => {
  // Convert Parse.Object to JSON
  var objectToSave = request.object.toJSON();
  // Specify Algolia's objectID with the Parse.Object unique ID
  objectToSave.objectID = objectToSave.objectId;
  // Add or update object
  index.saveObject(objectToSave, (err, content) => {
    if (err) {
      throw err;
    }
    console.log('Parse<>Algolia object saved');
  });
});

Parse.Cloud.afterDelete('Properties', request => {
  // Get Algolia objectID
  var objectID = request.object.id;
  // Remove the object from Algolia
  index.deleteObject(objectID, (err, content) => {
    if (err) {
      throw err;
    }
    console.log('Parse<>Algolia object deleted');
  });
});
