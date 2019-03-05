const express = require('express');
const router = express.Router();
const { report } = require('../utils/errorHelpers');

router.post('/', (req, res) => {
	if (Parse.User.current()) {
		Parse.User.logOut()
			.then(() =>
				Parse.User.current() ? res.json({ success: true }) : res.json({ success: false })
			)
			.catch(error => {
				report(error);
				res.json({ success: false, error: error.message });
			});
	} else {
		res.json({ success: false, message: 'no authenticated user' });
	}
});

module.exports = router;
