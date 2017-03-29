// jshint esversion: 6, node: true, strict: true
/* globals describe, context, it */
'use strict';
const expect = require('chai').expect;
const app = require('../src/app.js');
const _ = require('lodash');

let points = [
  [1, 3], // p1
  [3, 6], // p2
  [4, 1], // p3
  [2, 8], // p4
  [5, 7], // p5
  [8, 2], // p6
  [6, 5], // p7
  [9, 4], // p8
  [7, 10], // p9
  [10, 9], // p10
];

describe('App', () => {
    it('Should create KD-tree from given array of points', () => {
      let result = new app.KDTree(points);
      // console.log(JSON.stringify(result, null, 2));
      expect(result).to.be.deep.equal(require('./tree-expected.js'));
    });

    it('Should return all elements in a subtree', () => {
      let tree = new app.KDTree(points);
      expect(app.pointsWithinSubtree(tree)).to.be.deep.equal(points);
      expect(app.pointsWithinSubtree(tree.left.left.left)).to.be.deep.equal(points.slice(0, 2));
      expect(app.pointsWithinSubtree(tree.left.left)).to.be.deep.equal(points.slice(0, 3));
      expect(app.pointsWithinSubtree(tree.right.right)).to.be.deep.equal(points.slice(8, 10));
    });

    it('Should return area of given subtree', () => {
      let tree = new app.KDTree(points);
      expect(app.areaOfSubtree(tree)).to.be.deep.equal({
        x: {
          min: 1,
          max: 10
        },
        y: {
          min: 1,
          max: 10
        }
      });
    });

    it('Should return proper elements within query', () => {
      let query = {
        x: {
          min: 4,
          max: 7
        },
        y: {
          min: 4,
          max: 8
        }
      };
      let tree = new app.KDTree(points);
      expect(tree.search(query)).to.be.deep.equal([[5, 7], [6, 5]]);
    });

    it('Should properly result given points from lab', () => {
      let tree = new app.KDTree(require('./test-points-lab.js'));
      let queries = require('./test-queries-lab.js');
      queries.forEach((query) => {
        console.log(tree.search(query));
        // console.log(JSON.stringify(tree.search(query), null, 2));
        console.log();
      });
    });
});
