const express = require('express');
const router = express.Router();
const { postToFirebase } = require('../utils/ImageUploadHelpers');
const { report } = require('../utils/errorHelpers');

router.post('/', async (req, res) => {
	const Properties = Parse.Object.extend('Properties');
	const property = new Properties();

	const media = await postToFirebase(req.files.images);
	if (currentUser) {
		property
			.save({
				...req.body,
				media,
				verified: false,
				ratings: {
					'5': 0,
					'4': 0,
					'3': 0,
					'2': 0,
					'1': 0
				},
				likes: 0,
				overallRating: 0
			})
			.then(property => res.json({ success: true, id: property.id }))
			.catch(error => {
				report(error);
				res.json({ success: false, error: error.message });
			});
	} else {
		return res.json({ success: false, error: 'unauthorized' });
	}
	return;
});

module.exports = router;
