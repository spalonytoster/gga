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

  it('should sort given set of points by x and y and return 2 sorted sets', () => {
    let arr = [[1, 2], [3, 4], [1, 2], [2, 1], [4, 3], [6, 7], [9, 3]];
    let result = utils2D.preprocess(arr);
    expect(result.x).to.be.deep.equal([[1, 2], [1, 2], [2, 1], [3, 4], [4, 3], [6, 7], [9, 3]]);
    expect(result.y).to.be.deep.equal([[2, 1], [1, 2], [1, 2], [4, 3], [9, 3], [3, 4], [6, 7]]);
  });

  it('should slice set of points into 2 parts', () => {
    let arr = utils2D.preprocess([[1, 2], [3, 4], [1, 2], [2, 1], [4, 3], [6, 7], [9, 3]]);
    let result = utils2D.slice(arr);
    expect(result.left).to.be.deep.equal({
      x: [[ 1, 2 ], [ 1, 2 ], [ 2, 1 ]],
      y: [[ 2, 1 ], [ 1, 2 ], [ 1, 2 ]]
    });
    expect(result.right).to.be.deep.equal({
      x: [[ 3, 4 ], [ 4, 3 ], [ 6, 7 ], [ 9, 3 ]],
      y: [[ 4, 3 ], [ 9, 3 ], [ 3, 4 ], [ 6, 7 ]]
    });
  });

  it('should filter set of points given range on x-axis', () => {
    let arr = [[1, 2], [1, 2], [2, 1], [3, 4], [4, 3], [6, 7], [9, 3]];
    let points = utils2D.preprocess(arr);
    let result = utils2D.pointsWithinRange(points, 2.01, 8.9);
    expect(result).to.be.deep.equal({
      x: [[3, 4], [4, 3], [6, 7]],
      y: [[4, 3], [3, 4], [6, 7]]
    });
  });
});
