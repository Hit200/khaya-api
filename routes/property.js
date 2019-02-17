const express = require('express');
const router = express.Router();
const request = require('superagent');
const { calculateOverallRating } = require('../utils/parseHelpers');

// Globals
const Reviews = Parse.Object.extend('Reviews');
const review = new Reviews();
const Properties = Parse.Object.extend('Properties');
const query = new Parse.Query(Properties);

router.put('/:id/comment', (req, res) => {
	const currentUser = Parse.User.current();
	if (currentUser) {
		review
			.save({
				property: req.params.id,
				...req.body
			})
			.then(review => res.json({ success: true, id: review.id }))
			.catch(error => res.json({ success: false, error: error.message }));
	} else {
		return res.json({ success: false, error: 'unauthorized' });
	}
});

router.put('/:id/rate/:stars', async (req, res) => {
	const { id, stars } = req.params;

	const url = `http://localhost:1337/parse/classes/Properties/${id}`;

	query
		.get(id)
		.then(async property => {
			const ratings = await property.get('ratings');
			let ratingCount = await ratings[`${stars}`];
			ratingCount += 1;
			ratings[`${stars}`] += 1;

			request
				.put(url)
				.set('Content-Type', 'application/json')
				.set('X-Parse-Application-id', 'parse-khaya-app-ID')
				.send({
					[`ratings.${stars}`]: ratingCount,
					overallRating: calculateOverallRating(ratings)
				})
				.then(response => res.json({ success: true }))
				.catch(error => res.json({ success: false, error: error.message }));
		})
		.catch(error => res.json({ success: false, error: error.message }));
});

router.get('/:id/details', (req, res) =>
	query
		.get(req.params.id)
		.then(property => res.json({ success: true, property }))
		.catch(error => res.json({ success: false, error: error.message }))
);

module.exports = router;
