const express = require('express');
const router = express.Router();
const request = require('superagent');
const { calculateOverallRating } = require('../utils/parseHelpers');
const { report } = require('../utils/errorHelpers');

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
			.catch(error => {
				report(error);
				res.json({ success: false, error: error.message });
			});
	} else {
		report(error);
		return res.json({ success: false, error: 'unauthorized' });
	}
});

router.put('/:id/rate/:stars', async (req, res) => {
	const { id, stars } = req.params;

	const url = `https://khaya-api.herokuapp.com/parse/classes/Properties/${id}`;

	query
		.get(id)
		.then(async property => {
			const ratings = await property.get('ratings');
			let ratingCount = ratings[`${stars}`];
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
				.catch(error => {
					report(error);
					res.json({ success: false, error: error.message });
				});
		})
		.catch(error => {
			report(error);
			res.json({ success: false, error: error.message });
		});
});

router.get('/:id/details', (req, res) =>
	query
		.get(req.params.id)
		.then(property => res.json({ success: true, property }))
		.catch(error => {
			report(error);
			res.json({ success: false, error: error.message });
		})
);

router.put('/:id/room/:room/bed/:bed', (req, res) => {
	const { id, room, bed } = req.params;
	const user = Parse.User.current();

	query.get(id).then(property => {
		property.set(`room.${room}.${bed}`, user.id);
		property.increment(`room.${room}`);
		property
			.save()
			.then(() => res.json({ success: true }))
			.catch(error => {
				Parse.Analytics.track(error, { message: error.message });
				res.json({ success: false, error });
			});
	});
});
module.exports = router;
