// jshint esversion: 6, node: true
'use strict';
const utils = require('./utils-1d.js');
const _ = require('lodash');

function preprocess(array) {
  return array.sort();
}

function recur(points) {
  let leftSide = points.slice(0, points.length / 2);
  let rightSide = points.slice(points.length / 2);

  let minPairLeft = [];
  if (leftSide.length > 1) {
    minPairLeft = recur(leftSide);
  }

  let minPairRight = [];
  if (rightSide.length > 1) {
    minPairRight = recur(rightSide);
  }
  let centerPair = [_.last(leftSide), _.first(rightSide)];

  return utils.min([minPairLeft, minPairRight, centerPair]);
}

function findTwoClosestPoints(array) {
  let points = preprocess(array);
  return recur(points);
}

module.exports = { findTwoClosestPoints };
