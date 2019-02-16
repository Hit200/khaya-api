const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const profile = await Parse.User.logIn(req.body.username, req.body.password);
		//const user = await Parse.User.become(profile.sessionToken);
		res.json({ success: true, profile });
	} catch (error) {
		res.json({ success: false, error: error.message });
	}
});

module.exports = router;
