const express = require('express');
const router = express.Router();
const { report } = require('../utils/errorHelpers');
const { getMin, getMax } = require('../utils/parseHelpers');

router.post('/', async (req, res) => {
	const Properties = Parse.Object.extend('Properties');
	const property = new Properties();

	const currentUser = Parse.User.current();
	if (currentUser) {
		property
			.save({
				...req.body,
				verified: false,
				minPrice: getMin(req.body.room),
				maxPrice: getMax(req.body.room),
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
				report(error.message);
				res.json({ success: false, error: error.message });
			});
	} else {
		return res.json({ success: false, error: 'unauthorized' });
	}
	return;
});

module.exports = router;
