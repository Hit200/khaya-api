const { calculateOverallRating } = require('../utils/parseHelpers');

rating = {
	'5': 50,
	'4': 33,
	'3': 66,
	'2': 17,
	'1': 35
};
describe('Calculate 5 Star Rating', () => {
	it('Should return overall rating', () => {
		const overall = calculateOverallRating(rating);
		expect(overall).toBe(4);
	});
});
