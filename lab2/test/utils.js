// jshint esversion: 6
const expect = require('chai').expect;
const utils1D = require('../src/utils-1d.js');
const utils2D = require('../src/utils-2d.js');

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
    let arr = [
      [[1, 2], [3, 4]],
      [[1, 2], [2, 1]],
      [[4, 3], [6, 7]]
    ];
    expect(utils2D.min(arr)).to.be.deep.equal([[1, 2], [2, 1]]);
  });
});