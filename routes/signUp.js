const express = require('express');
const router = express.Router();
const { report } = require('../utils/errorHelpers');

router.post('/', async (req, res) => {
	const user = new Parse.User();

	try {
		const profile = await user.signUp(req.body);
		res.json({ success: true, id: profile.id });
	} catch (error) {
		report(error);
		res.json({ success: false, error: error });
	}
});

module.exports = router;
