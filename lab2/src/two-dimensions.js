// jshint esversion: 6, node: true
'use strict';

function bruteForce(inputPoints) {
  let bestPair = [[], []];
  inputPoints.forEach((point) => {

  });
  return bestPair;
}

function findTwoClosestPoints(inputPoints) {
  // Sort points according to their x-coordinates.
  let pointsSortedByX = inputPoints.sort((a, b) => {
    return a[0] - b[0];
  });

  let pointsSortedByY = inputPoints.sort((a, b) => {
    return a[1] - b[1];
  });

  // Split the set of points into two equal-sized subsets by a vertical line x=xmid.
  // let left = points.slice(0, points.length / 2);
  // let right =  points.slice(points.length / 2);

  return [];
}

module.exports = { findTwoClosestPoints };
