// jshint esversion: 6, node: true
'use strict';

function preprocess(array) {
  return {
    x: array.slice().sort((a, b) => {
      return a[0] - b[0];
    }),
    y: array.slice().sort((a, b) => {
      return a[1] - b[1];
    })
  };
}

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
    x: points.x.slice(0, points.x.length / 2),
    y: points.y.slice(0, points.y.length / 2)
  };
  let rightSide =  {
    x: points.x.slice(points.x.length / 2),
    y: points.y.slice(points.y.length / 2)
  };

  return {
    left: leftSide,
    right: rightSide
  };
}

function pointsWithinRange(points, x1, x2) {
  return {
    x: points.x.filter((point) => {
      return point[0] >= x1 && point[0] <= x2;
    }),
    y: points.y.filter((point) => {
      return point[0] >= x1 && point[0] <= x2;
    })
  };
}

function closest(R, B) {
  let closest = [[], []];
  closest.distance = Infinity;

  return [];
}

module.exports = {
  distance,
  min,
  slice,
  distanceX,
  pointsWithinRange,
  closest,
  preprocess
};
