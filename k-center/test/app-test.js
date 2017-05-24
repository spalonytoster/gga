/* global it, describe, context */
'use strict';
// const expect = require('chai').expect;
const assert = require('chai').assert;
const app = require('../src/app.js');

const points = require('./points.json');

describe('k-center function', () => {
  context('given k = 2', () => {
    let k = 2;

    it('Should return 2 valid centers', () => {
      let expected = [[1, 1], [3, 3]];
      let result = app.kcenter(points, k);
      console.log(result);

      expected.forEach((point) => assert.includeDeepMembers(result, [point]));
    });
  });
});
