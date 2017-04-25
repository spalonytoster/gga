// jshint esversion: 6, node: true, strict: true
/* globals describe, context, it */
'use strict';
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../src/app.js');

const points = [
  [6, 1],
  [7, 4],
  [8, 5],
  [1, 0],
  [7, -2],
  [2, 2],
  [5, -6],
  [1, 1],
  [3, 2],
  [9, 3],
  [4, -3],
  [2, 3],
  [9, 4],
  [5, 2],
  [3, -4],
  [5, 6],
  [7, 2],
  [6, -7],
  [8, -9],
  [4, 5],
  [9, 2],
  [6, 2],
  [2, -1],
  [4, 3]
];

describe('App', () => {
  it('Should be able to detect maxima', () => {
    let expected = [
      [1, 0], [1, 1], [2, 3], [4, 5], [5, 6], [8, 5],
      [9, 4], [9, 3], [9, 2], [3, -4], [5, -6],
      [6, -7], [8, -9], [2, -1], [2, 3]
    ];
    let result = app.detectMaxima(points);
    assert.lengthOf(result, expected.length);
    expected.forEach((point) => assert.includeDeepMembers(result, [point]));
  });
});
