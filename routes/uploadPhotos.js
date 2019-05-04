const express = require('express');
const router = express.Router();
const { report } = require('../utils/errorHelpers');
const { postToGrid } = require('../utils/ImageUploadHelpers');

router.post('/', (req, res) => {
	const photos = req.files.photos;

	postToGrid(photos)
		.then(imagesArray => imagesArray)
		.catch(error => report(error));
});

module.exports = router;
