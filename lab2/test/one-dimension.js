// jshint esversion: 6
const expect = require('chai').expect;
const app = require('../src/one-dimension.js');

let points = [6.7, 1, 3, 6.9, 9, 9.5, 9.9, 11, 16];
describe('Closest pair of points problem algorithm (one dimension)', () => {
  context('Given array of example inputs: ' + points.join(', '), () => {
    it('should return [6.7] and [6.9]', () => {
      expect(app.findTwoClosestPoints(points)).to.be.deep.equal([6.7, 6.9]);
    });
  });
});
