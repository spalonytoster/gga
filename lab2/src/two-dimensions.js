// jshint esversion: 6, node: true
'use strict';
const utils = require('./utils-2d.js');
const _ = require('lodash');

function recur(points) {
  if (points.x.length < 3) {
    return points;
  }

  // Split the set of points into two equal-sized subsets by a vertical line x=xmid.
  let sliced = utils.slice(points);
  let leftSide = sliced.left;
  let rightSide =  sliced.right;

  let minPairLeft = [];
  if (leftSide.x.length > 1) {
    minPairLeft = recur(leftSide);
  }
  let minPairRight = [];
  if (rightSide.x.length > 1) {
    minPairRight = recur(rightSide);
  }

  // console.log(minPairLeft, minPairRight);
  let deltaPair = utils.min(_.compact([minPairLeft.x, minPairRight.x]));
  let line = {};
  line.x = _.last(leftSide.x)[0];

  let R = utils.pointsWithinRangeX(leftSide.y, line.x - deltaPair.distance, line.x);
  let B = utils.pointsWithinRangeX(rightSide.y, line.x, line.x + deltaPair.distance);
  let centerPair = utils.closest(R, B, deltaPair.distance);

  let result = utils.min([centerPair, deltaPair]);
  return utils.preprocess(result);
}

function findTwoClosestPoints(array) {
  let points = utils.preprocess(array);
  return recur(points).x;
}

module.exports = { findTwoClosestPoints };
