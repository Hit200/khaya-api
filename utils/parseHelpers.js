const ARBITRARY = 100; // arbitrary number or constant used in calculation.

const calculateOverallRating = ratingObject => {
  let overallRating = 0;
  for (let i = 1; i <= Object.keys(ratingObject).length; i++) {
    overallRating +=
      i * (0.25 * ratingObject[`${i}`] + 2.5 * (1 - Math.exp(-ratingObject[`${i}`])));
  }
  return Math.round(overallRating) / 100;
};

module.exports = { calculateOverallRating };