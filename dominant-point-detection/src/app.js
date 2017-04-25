// jshint esversion: 6, node: true
'use strict';
const _ = require('lodash');

function detectMaxima(points) {
  points.sort();

  let results = [];

  let min = _.first(points)[1];
  let max = _.first(points)[1];
  results.push(_.first(points));

  for (let i = 1; i < points.length; i++) {
    let point = points[i];
    let y = point[1];
    if (y > max) {
      results.push(point);
      max = y;
    }
    if (y < min) {
      results.push(point);
      min = y;
    }
  }

  min = _.last(points)[1];
  max = _.last(points)[1];
  results.push(_.last(points));

  for (let i = points.length-2; i >= 0; i--) {
    let point = points[i];
    let y = point[1];
    if (y > max) {
      results.push(point);
      max = y;
    }
    if (y < min) {
      results.push(point);
      min = y;
    }
  }

  return _.uniq(results);
}

module.exports = { detectMaxima };
