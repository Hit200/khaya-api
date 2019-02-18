const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	Parse.User.become(req.body.sessionToken)
		.then(user => res.json({ success: true }))
		.catch(error => res.json({ success: false }));
});

module.exports = router;
