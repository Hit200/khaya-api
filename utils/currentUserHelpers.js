const getCurrentUserForMobile = () => {
	const user = Parse.User.current();
	return user ? user.id : '';
};

module.exports = { getCurrentUserForMobile };
