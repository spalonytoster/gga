// jshint esversion: 6, node: true, strict: true
/* globals describe, context, it */
'use strict';
const expect = require('chai').expect;
const app = require('../src/two-dimensions.js');

const arr = [
  [6, 7], [4, 7], [5, 3], [4, 3], [1, 1], [3, 1],
  [9, 7], [9, 3], [8, 5], [9, 1], [7, 1], [2, 5]
];

describe('Closest pair of points problem algorithm (planar case)', () => {
  context('Given array of example inputs: ' + arr.join(' '), () => {
    it('should return [[4, 3], [5, 3]]', () => {
      expect(app.findTwoClosestPoints(arr)).to.be.deep.equal([[4, 3], [5, 3]]);
    });
  });
});
