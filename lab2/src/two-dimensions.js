// jshint esversion: 6, node: true
'use strict';
const utils = require('./utils-2d.js');
const _ = require('lodash');

function preprocess(array) {
  return {
    x: array.sort((a, b) => {
      return a[0] - b[0];
    }),
    y: array.sort((a, b) => {
      return a[1] - b[1];
    })
  };
}

function recur(points) {
  // Split the set of points into two equal-sized subsets by a vertical line x=xmid.
  let sliced = utils.slice(points);
  let leftSide = sliced.left;
  let rightSide =  sliced.right;

  let minPairLeft = [];
  if (leftSide.length > 1) {
    minPairLeft = recur(leftSide);
  }

  let minPairRight = [];
  if (rightSide.length > 1) {
    minPairRight = recur(rightSide);
  }

  let deltaPair = utils.min(minPairLeft, minPairRight);
  let line = {};
  line.x = (_.first(points.x)[0] + _.last(points.x)[0]) / 2;

  // punkty zawierajace sie w pasku delta R - red, B - blue
  let R = utils.pointsWithinRange(points.x, line.x - deltaPair.distance, line.x);
  let B = utils.pointsWithinRange(points.x, line.x + deltaPair.distance, line.x);
  let centerPair = utils.closest(R, B);

  return utils.min(centerPair, deltaPair);
}

function findTwoClosestPoints(array) {
  let points = preprocess(array);
  return recur(points);
}

module.exports = { findTwoClosestPoints };
