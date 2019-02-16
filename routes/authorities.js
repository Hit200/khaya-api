const express = require('express');
const router = express.Router();

router.put('/property/:id/verify', (req, res) => {
	const Properties = Parse.Object.extend('Properties');
	const query = new Parse.Query(Properties);
	const currentUser = Parse.User.current();
	query
		.get(req.params.id)
		.then(property => {
			if (currentUser) {
				property
					.save({
						verified: true
					})
					.then(() => res.json({ success: true }))
					.catch(error => res.json({ success: false, error: error.message }));
			} else {
				return res.json({ success: false, message: 'unauthorized' });
			}
		})
		.catch(error => res.json({ success: false, error: error.message }));
});

module.exports = router;
