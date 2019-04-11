const ARBITRARY = 100; // arbitrary number or constant used in calculation.

const calculateOverallRating = ratingObject => {
	let overallRating = 0;
	for (let i = 1; i <= Object.keys(ratingObject).length; i++) {
		overallRating += i * (0.5 * i + 2.5 * (1 - Math.exp(-ratingObject[`${i}`])));
	}
	return Math.round(overallRating / 15);
};

const getMin = rooms => Math.min(...rooms.map(room => room.price));
const getMax = rooms => Math.max(...rooms.map(room => room.price));

module.exports = { calculateOverallRating, getMin, getMax };
