'use strict';
const _ = require('lodash');

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function furthestPoint(points, S) {
  let max = {
    distance: NaN,
    index: NaN
  };

  S.forEach((s) => {
    max = {
      distance: distance(s, _.first(points)),
      index: 0
    };

    for (let i = 1; i < points.length; i++) {
      let dist = distance(s, points[i]);
      if (dist > max.distance) {
        max.distance = dist;
        max.index = i;
      }
    }
  });

  return points[max.index];
}

// function calculateDistances(points, k) {
//
// }

function kcenter(points, k) {
  // let s1 = _.sample(points);
  let s1 = points[0];
  let S = [s1];

  // let distances = calculateDistances(points, s1);

  for (let j = 1; j < k; j++) {

    let sj = furthestPoint(points, S);
    S.push(sj);
  }

  return S;
}

module.exports = { kcenter };
