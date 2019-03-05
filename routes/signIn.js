const express = require('express');
const router = express.Router();
const { report } = require('../utils/errorHelpers');

router.post('/', async (req, res) => {
	Parse.User.enableUnsafeCurrentUser();
	Parse.User.become(req.body.sessionToken)
		.then(user => res.json({ success: true }))
		.catch(error => {
			report(error.message);
			res.json({ success: false, error: error.message });
		});
});

module.exports = router;
