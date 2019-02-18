const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	Parse.User.requestPasswordReset(req.body.email)
		.then(() => {
			console.log('Request has been sent');
			res.json({
				success: true,
				message: `email with password reset link has been sent to ${req.body.email}`
			});
		})
		.catch(error => {
			alert('Error: ' + error.code + ' ' + error.message);
		});
});

module.exports = router;
