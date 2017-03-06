// jshint esversion: 6, node: true
'use strict';
const utils = require('./utils-2d.js');
const _ = require('lodash');

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

  console.log(minPairLeft, minPairRight);
  let deltaPair = utils.min(minPairLeft, minPairRight);
  let line = {};
  line.x = _.first(points.x)[0];

  // punkty zawierajace sie w pasku delta R - red, B - blue
  // FIXME punkty ktore znajduja sie na prostej l, istnieja w obu zbiorach (R i B).
  // zamienic filtrowanie na wyjmowanie z tablicy (pull zamiast filter)
  // trzeba zaimplementowac wlasne..
  let R = utils.pointsWithinRangeX(points.y, line.x - deltaPair.distance, line.x);
  let B = utils.pointsWithinRangeX(points.y, line.x, line.x + deltaPair.distance);
  let centerPair = utils.closest(R, B, deltaPair.distance);

  return utils.min(centerPair, deltaPair);
}

function findTwoClosestPoints(array) {
  let points = utils.preprocess(array);
  return recur(points);
}

module.exports = { findTwoClosestPoints };
