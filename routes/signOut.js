const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	if (Parse.User.current()) {
		Parse.User.logOut()
			.then(() =>
				Parse.User.current() ? res.json({ success: true }) : res.json({ success: false })
			)
			.catch(error => console.error(error));
	} else {
		res.json({ success: true, message: 'no authenticated user' });
	}
});

module.exports = router;
