// jshint esversion: 6, node: true
'use strict';
const utils = require('./utils-1d.js');
const _ = require('lodash');

function findTwoClosestPoints(inputPoints) {
  let points = inputPoints.sort();

  let leftSide = inputPoints.slice(0, points.length / 2);
  let rightSide = inputPoints.slice(points.length / 2);

  let minPairLeft = [];
  if (leftSide.length > 1) {
    minPairLeft = findTwoClosestPoints(leftSide);
  }

  let minPairRight = [];
  if (rightSide.length > 1) {
    minPairRight = findTwoClosestPoints(rightSide);
  }
  let centerPair = [_.last(leftSide), _.first(rightSide)];

  return utils.min([minPairLeft, minPairRight, centerPair]);
}

module.exports = { findTwoClosestPoints };
