const express = require('express');
const router = express.Router();
const { report } = require('../utils/errorHelpers');

router.post('/', (req, res) => {
	Parse.User.requestPasswordReset(req.body.email)
		.then(() => {
			res.json({
				success: true,
				message: `email with password reset link has been sent to ${req.body.email}`
			});
		})
		.catch(error => {
			report(error);
			res.json({ success: false, error: error.message });
		});
});

module.exports = router;
