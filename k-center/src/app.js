'use strict';
const _ = require('lodash');

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function furthestPoint(points, sj) {
  let max = {
    distance: distance(sj, _.first(points)),
    index: 0
  };

  for (let i = 1; i < points.length; i++) {
    let dist = distance(sj, points[i]);
    if (dist > max) {
      max.distance = dist;
      max.index = i;
    }
  }

  return max;
}

function kcenter(points, k) {
  let s1 = _.sample(points);
  let S = [s1];

  for (let j = 1; j <= k; j++) {
    let sj = furthestPoint(points.slice(0, j-1), points[j]);
    S.push(sj);
  }

  return S;
}

module.exports = { kcenter };
