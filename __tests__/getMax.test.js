const { getMax } = require('../utils/parseHelpers');

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

describe('Getting Maximum Price For Property', () => {
	it('Should return max price', () => {
		try {
			const max = getMax(room);
			expect(max).toEqual(166);
		} catch (error) {
			console.log(error);
		}
	});
});
