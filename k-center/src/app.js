'use strict';
const _ = require('lodash');

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function furthestPoint(points, S, distances) {
  let last = _.last(S);
  let max = {
    distance: NaN,
    index: NaN
  };

  max = {
    distance: -1,
    index: -1
  };

  for (let i = 0; i < points.length; i++) {
    if (_.isEqual(points[i], last)) {
      continue;
    }
    let dist = distances[i];
    if (dist > max.distance) {
      max.distance = dist;
      max.index = i;
    }
  }

  let newMax = points[max.index];
  for (let i = 0; i < points.length; i++) {
    if (_.isEqual(points[i], max)) {
      continue;
    }
    let dist = distance(newMax, points[i]);
    if (dist < distances[i]) {
      distances[i] = dist;
    }
  }

  return newMax;
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
  let S = [s1];
  let distances = calculateDistances(points, s1);

  for (let j = 1; j < k; j++) {
    let sj = furthestPoint(points, S, distances);
    S.push(sj);
  }

  return S;
}

module.exports = { kcenter };
