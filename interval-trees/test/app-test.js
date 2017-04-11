// jshint esversion: 6, node: true, strict: true
/* globals describe, context, it */
'use strict';
const expect = require('chai').expect;
const app = require('../src/app.js');

let intervals = [
  [3,  4],
  [2,  7],
  [6, 10],
  [0,  2],
  [8, 10],
  [1,  4],
  [4,  8],
  [5, 10]
];

function mapInterval(interval) {
  return { a: interval[0], b: interval[1] };
}

describe('App', () => {
  it('Should calculate median of intervals', () => {
    expect(app.median([[3,  4], [2,  7],])).to.be.equal(4);
  });

  it('Should return every line segment intersecting with query point', () => {
    let expected = [[4, 8], [2, 7], [5, 10], [6, 10]];
    let result = app.query(intervals, 6);
    expected.forEach((interval) =>
    expect(result.map(mapInterval)).to.include(mapInterval(interval)));
  });
});
