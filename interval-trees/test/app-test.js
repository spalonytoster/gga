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

let lab1 = [
  [2, 4],
  [6, 8],
  [10, 12],
  [14, 16],
  [18, 20],
  [22, 24],
  [26, 28],
  [30, 32],
  [34, 36],
  [38, 40]
];

let lab2 = [
  [2, 4], [6, 8], [10, 12],
  [2, 4], [6, 8], [10, 12],
  [2, 4], [6, 8], [10, 12],
  [2, 4], [6, 8], [10, 12]
];

let lab3 = [
  [2, 2],
  [4, 4],
  [6, 6],
  [8, 8],
  [10, 10],
  [12, 12],
  [14, 14],
  [16, 16],
  [18, 18],
  [20, 20],
];

let lab4 = [
  [2, 2],
  [2, 2],
  [2, 2],
  [2, 2],
  [2, 2],
  [2, 2],
  [2, 2],
  [2, 2],
  [2, 2],
  [2, 2],
];

let lab5 = [
  [2, 4],
  [2, 4],
  [2, 10],
  [2, 10],
  [6, 14],
  [6, 14],
  [12, 14],
  [12, 14],
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

  it('Should work for examples from lab', () => {
    // 1)
    let result11 = app.query(lab1, 7);
    console.log(result11);
    let result12 = app.query(lab1, 9);
    console.log(result12);

    console.log('-----------------------------------------');

    // 2)
    let result21 = app.query(lab2, 7);
    console.log(result21);
    let result22 = app.query(lab2, 9);
    console.log(result22);

    console.log('-----------------------------------------');

    // 3)
    let result31 = app.query(lab3, 6);
    console.log(result31);
    let result32 = app.query(lab3, 7);
    console.log(result32);

    console.log('-----------------------------------------');

    // 4)
    let result41 = app.query(lab4, 2);
    console.log(result41);
    let result42 = app.query(lab4, 3);
    console.log(result42);

    console.log('-----------------------------------------');

    // 5)
    let result51 = app.query(lab5, 3);
    console.log(result51);
    let result52 = app.query(lab5, 5);
    console.log(result52);
    let result53 = app.query(lab5, 7);
    console.log(result53);
  });
});
