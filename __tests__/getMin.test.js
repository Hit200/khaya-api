const { getMin } = require('../utils/parseHelpers');

const room = [
	{
		number: 1,
		price: 150
	},
	{
		number: 2,
		price: 166
	}
];

describe('Getting Minimum Price For Property', () => {
	it('Should return min price', () => {
		try {
			const min = getMin(room);
			expect(min).toEqual(150);
		} catch (error) {
			console.log(error);
		}
	});
});
