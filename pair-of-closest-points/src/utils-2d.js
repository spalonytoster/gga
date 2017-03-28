// jshint esversion: 6, node: true
'use strict';
const _ = require('lodash');

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

function min(pairs) {
  let closest = [];
  closest.distance = Infinity;
  if (pairs.length === 1) {
    let pair = pairs[0];
    if (pair.length < 2) {
      return closest;
    }
    pair.distance = distance(pair[0], pair[1]);
    return pair;
  }
  if (pairs.length < 1) {
    return closest;
  }
  pairs.forEach((pair) => {
    if (pair.length < 2) return;
    let dist = distance(pair[0], pair[1]);
    if (dist < closest.distance) {
      closest = pair;
      closest.distance = dist;
    }
  });
  return closest;
}

function slice(points) {
  let left = points.x.slice(0, points.x.length / 2);
  let leftSide = {
    x: left,
    y: left.slice().sort((a, b) => {
      return a[1] - b[1];
    })
  };
  let right = points.x.slice(points.x.length / 2);
  let rightSide =  {
    x: right,
    y: right.slice().sort((a, b) => {
      return a[1] - b[1];
    })
  };

  return {
    left: leftSide,
    right: rightSide
  };
}

function pointsWithinRangeX(points, from, to) {
  return points.filter((point) => {
    return point[0] >= from && point[0] <= to;
  });
}

function pointsWithinRangeY(points, start, from, to) {
  let result = [];
  for (let i = start; i < points.length; i++) {
    let point = points[i];
    if (point[1] >= from && point[1] <= to) {
      result.push(point);
    }
    else {
      result.lastIndex = i;
    }
    if (point[1] > to) {
      break;
    }
  }
  return result;
}

function closest(R, B, delta) {
  R.closestPairs = [];
  B.start = 0;
  R.forEach((red) => {
    let blues = pointsWithinRangeY(B, B.start, red[1], red[1] + delta);
    B.start = blues.lastIndex;
    let pairs = [];
    blues.forEach((blue) => {
      pairs.push([red, blue]);
    });
    if (pairs.length > 0) {
      R.closestPairs.push(min(pairs));
    }
  });

  B.closestPairs = [];
  R.start = 0;
  B.forEach((blue) => {
    let reds = pointsWithinRangeY(R, R.start, blue[1], blue[1] + delta);
    R.start = reds.lastIndex;
    let pairs = [];
    reds.forEach((red) => {
      pairs.push([blue, red]);
    });
    if (pairs.length > 0) {
      B.closestPairs.push(min(pairs));
    }
  });

  return min(_.concat(R.closestPairs, B.closestPairs));
}

module.exports = {
  distance,
  min,
  slice,
  pointsWithinRangeX,
  pointsWithinRangeY,
  closest,
  preprocess
};
