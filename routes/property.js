const express = require('express');
const router = express.Router();
const request = require('superagent');
const { calculateOverallRating } = require('../utils/parseHelpers');
const { sendSMS, sendEmail } = require('../utils/notificationHelpers');
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
				report(error.message);
				res.json({ success: false, error: error.message });
			});
	} else {
		report(error.message);
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
				.set('X-Parse-Application-Id', process.env.APP_ID)
				.send({
					[`ratings.${stars}`]: ratingCount,
					overallRating: calculateOverallRating(ratings)
				})
				.then(() => res.json({ success: true }))
				.catch(error => {
					report(error.message);
					res.json({ success: false, error: error.message });
				});
		})
		.catch(error => {
			report(error.message);
			res.json({ success: false, error: error.message });
		});
});

router.get('/:id/details', (req, res) =>
	query
		.get(req.params.id)
		.then(property => res.json({ success: true, property }))
		.catch(error => {
			report(error.message);
			res.json({ success: false, error: error.message });
		})
);

router.post('/:id/room/:room', async (req, res) => {
	const { id, room } = req.params;
	const user = Parse.User.current();
	const name = await user.getUsername();
	const email = await user.getEmail();
	const contact = await user.get('contact');

	console.log(contact);

	try {
		const property = await query.get(id);
		const rooms = await property.get('room');
		const location = await property.get('location');

		if (rooms[`${room - 1}`].current < rooms[`${room - 1}`].capacity) {
			rooms[`${room - 1}`].current += 1;
			await property.save({
				room: rooms
			});
			sendEmail(name, email, room, location);
			return res.json({ success: true });
		}

		res.json({ success: false, error: 'Room is fully booked.' });
	} catch (error) {
		report(error);
		res.json({ success: false, error: error.message });
	}
});

module.exports = router;
