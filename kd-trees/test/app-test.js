// jshint esversion: 6, node: true, strict: true
/* globals describe, context, it */
'use strict';
const expect = require('chai').expect;
const app = require('../src/app.js');

let points = [
  [1, 3], // p1
  [2, 8], // p4
  [3, 6], // p2
  [4, 1], // p3
  [5, 7], // p5
  [6, 5], // p7
  [7, 10], // p9
  [8, 2], // p6
  [9, 4], // p8
  [10, 9], // p10
];

describe('App', () => {
    it('Should create KD-tree from given array of points', () => {
      let result = new app.KDTree(points);
      // console.log(JSON.stringify(result, null, 2));
      expect(result).to.be.deep.equal({ // l1
        left: { // l2
          left: {
            left: {
              left: {
                value: [1, 3] // p1
              },
              right: {
                value: [3, 6] // p2
              }
            },
            right: {
              value: [4, 1] // p3
            }
          },
          right: {
            left: {
              value: [2, 8] // p4
            },
            right: {
              value: [5, 7] // p5
            }
          }
        },
        right: { // l3
          left: { // l6
            left: { // l9
              left: {
                value: [8, 2] // p6
              },
              right: {
                value: [6, 5] // p7
              }
            },
            right: {
              value: [9, 4] // p8
            }
          },
          right: { // l7
            left: {
              value: [7, 10]
            },
            right: {
              value: [10, 9]
            }
          }
        }
      });
    });
});
