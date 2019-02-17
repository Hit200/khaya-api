const express = require('express');
const router = express.Router();
const { postToFirebase } = require('../utils/ImageUploadHelpers');

router.post('/', async (req, res) => {
	const Properties = Parse.Object.extend('Properties');
	const property = new Properties();

	const currentUser = Parse.User.current();
	const media = await postToFirebase(req.files.images);
	//if (currentUser) {
	property
		.save({
			...req.body,
			verified: false,
			ratings: {
				'5': 0,
				'4': 0,
				'3': 0,
				'2': 0,
				'1': 0
			},
			overallRating: 0
		})
		.then(property => res.json({ success: true, id: property.id }))
		.catch(error => res.json({ success: false, error: error.message }));
	// } else {
	// 	return res.json({ success: false, error: 'unauthorized' });
	// }
	return;
});

module.exports = router;
