const express = require('express');
const router = express.Router();
const { getCurrentUserForMobile } = require('../utils/currentUserHelpers');
const { report } = require('../utils/errorHelpers');

router.get('/', (req, res) => {
	try {
		return getCurrentUserForMobile();
	} catch (error) {
		report(error);
	}
});
