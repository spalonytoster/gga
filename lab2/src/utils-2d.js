// jshint esversion: 6, node: true
'use strict';

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function distanceX(p1, p2) {
  return Math.sqrt(Math.pow(p1 - p2, 2));
}

function min(pairs) {
  let closest = [];
  closest.distance = Infinity;
  pairs.forEach((pair) => {
    let dist = distance(pair[0], pair[1]);
    if (dist < closest.distance) {
      closest = pair;
      closest.distance = dist;
    }
  });
  delete closest.distance;
  return closest;
}

function slice(points) {
  let leftSide = {
    x: points.x.slice(0, points.length / 2),
    y: points.y.slice(0, points.length / 2)
  };
  let rightSide =  {
    x: points.x.slice(points.length / 2),
    y: points.y.slice(points.length / 2)
  };

  return {
    left: leftSide,
    right: leftSide
  };
}

function pointsWithinRange(points, x1, x2) {
  return points.filter((point) => {
    return point[0] >= x1 && point[0] <= x2;
  });
}

function closest(R, B) {
  let closest = [[], []];
  closest.distance = Infinity;
  R.forEach((point) => {

  });
}

module.exports = { distance, min, slice, distanceX, pointsWithinRange, closest };
