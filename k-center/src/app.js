'use strict';
const _ = require('lodash');

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function furthestPoint(points, sj, distances) {
  let max = {
    distance: NaN,
    index: NaN
  };

  // S.forEach((s) => {
  max = {
    distance: _.first(distances),
    index: 0
  };

  for (let i = 1; i < points.length; i++) {
    if (points[i] === sj) {
      continue;
    }
    let dist = distances[i];
    if (dist > max.distance) {
      max.distance = dist;
      max.index = i;
    }
    let sjDist = distance(points[i], sj);
    if (sjDist > dist) {
      distances[i] = sjDist;
    }
  }
  // });

  let result = points[max.index];
  return result;
}

function calculateDistances(points, p) {
  let distances = [];
  points.forEach((point, index) => {
    distances[index] = distance(point, p);
  });
  return distances;
}

function kcenter(points, k) {
  // let s1 = _.sample(points);
  let s1 = points[0];
  // s1.index = 0;

  let S = [s1];

  for (let j = 1; j < k; j++) {
    let distances = calculateDistances(points, s1);
    let sj = furthestPoint(points, _.last(S), distances);
    S.push(sj);
  }

  return S;
}

module.exports = { kcenter };
