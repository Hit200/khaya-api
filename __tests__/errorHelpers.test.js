const { report } = require('../utils/errorHelpers');

const err = {
	code: 900,
	message: 'This is a sample test error'
};

describe('Report errors to Parse.Analytics', () => {
	it('Tracks errors', () => {
		report(err)
			.then(res => {
				expect(res).toBeInstanceOf(Parse);
			})
			.catch(error => console.log(error));
	});
});
