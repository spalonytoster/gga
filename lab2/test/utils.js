// jshint esversion: 6, node: true, strict: true
/* globals describe, it */
'use strict';
const expect = require('chai').expect;
const utils1D = require('../src/utils-1d.js');
const utils2D = require('../src/utils-2d.js');
const _ = require('lodash');

const arr = [
  [6, 7], [4, 7], [5, 3], [4, 3], [1, 1], [3, 1],
  [9, 7], [9, 3], [8, 5], [9, 1], [7, 1], [2, 5]
];

describe('1D utils module', () => {
  it('should calculate distance between two points on x axis', () => {
    expect(utils1D.distance(1, 5)).to.be.equal(4);
  });

  it('should calculate minimum given an array of point pairs', () => {
    let arr = [[1, 4], [1, 3], [2, 1]];
    expect(utils1D.min(arr)).to.be.deep.equal([2, 1]);
  });
});

describe('2D utils module', () => {
  it('should calculate distance between two points on x and y axis', () => {
    expect(utils2D.distance([1, 2], [3, 4])).to.be.equal(Math.sqrt(8));
  });

  it('should calculate minimum given an array of point pairs', () => {
    let pairs = [
      [[1, 2], [3, 4]],
      [[1, 2], [2, 1]],
      [[4, 3], [6, 7]]
    ];
    let result = utils2D.min(pairs);
    expect(result[0]).to.be.deep.equal([1, 2]);
    expect(result[1]).to.be.deep.equal([2, 1]);
  });

  it('should sort given set of points by x and y and return 2 sorted sets', () => {
    let result = utils2D.preprocess(arr);
    expect(result.x).to.be.deep.equal([[1, 1], [2, 5], [3, 1], [4, 3], [4, 7], [5, 3], [6, 7], [7, 1], [8, 5], [9, 3], [9, 1], [9, 7]]);
    expect(result.y).to.be.deep.equal([[1, 1], [3, 1], [9, 1], [7, 1], [5, 3], [4, 3], [9, 3], [2, 5], [8, 5], [6, 7], [4, 7], [9, 7]]);
  });

  it('should slice set of points into 2 parts', () => {
    let points = utils2D.preprocess(arr);
    let result = utils2D.slice(points);
    expect(result.left).to.be.deep.equal({
      x: [[1, 1], [2, 5], [3, 1], [4, 3], [4, 7], [5, 3]],
      y: [[1, 1], [3, 1], [4, 3], [5, 3], [2, 5], [4, 7]]
    });
    expect(result.right).to.be.deep.equal({
      x: [[6, 7], [7, 1], [8, 5], [9, 3], [9, 1], [9, 7]],
      y: [[7, 1], [9, 1], [9, 3], [8, 5], [6, 7], [9, 7]]
    });
  });

  it('should filter set of points given range on x-axis', () => {
    let points = utils2D.preprocess(arr);
    let result = utils2D.pointsWithinRangeX(points.x, 4.01, 8.9);
    expect(result).to.be.deep.equal([[5, 3], [6, 7], [7, 1], [8, 5]]);
  });

  it('should filter set of points given range on y-axis', () => {
    let points = utils2D.preprocess(arr);
    let result = utils2D.pointsWithinRangeY(points.y, 2.5, 6);
    expect(result).to.be.deep.equal([[5, 3], [4, 3], [9, 3], [2, 5], [8, 5]]);
  });

  // it('should find closest pair of points which distance between is less than delta in delta plane', () => {
    // let points = utils2D.preprocess(arr);
    // let line = {};
    // line.x = _.last(points.x)[0];
    //
    // let R = utils.pointsWithinRangeX(leftSide.y, line.x - deltaPair.distance, line.x);
    // let B = utils.pointsWithinRangeX(rightSide.y, line.x, line.x + deltaPair.distance);
    // let centerPair = utils.closest(R, B, deltaPair.distance);
  // });
});
