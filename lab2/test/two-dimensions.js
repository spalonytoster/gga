// jshint esversion: 6
const expect = require('chai').expect;
const app = require('../src/two-dimensions.js');

let points = [
  [2, 1],
  [8, 3],
  [5, 8],
  [9, 1],
  [5, 2],
  [3, 3],
  [4, 5],
  [6, 5],
  [1, 9],
  [2, 1.5],
];

describe('Closest pair of points problem algorithm (planar case)', () => {
  context('Given array of example inputs: ' + points.join(' '), () => {
    it('should return [2, 1] and [2, 1.5]', () => {
      expect(app.findTwoClosestPoints(points)).to.be.deep.equal([[2,1], [2, 1.5]]);
    });
  });
});
