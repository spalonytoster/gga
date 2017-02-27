// jshint esversion: 6, node: true
'use strict';

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function min(pairs) {
  let closest;
  closest.distance = Infinity;
  pairs.forEach((pair) => {
    let dist = distance(pair[0], pair[1]);
    if (dist < closest.distance) {
      closest = pair;
      closest.distance = dist;
    }
  });
  return closest;
}

module.exports = { distance, min };
