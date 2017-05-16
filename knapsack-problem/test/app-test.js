/* global it, describe */
'use strict';
const expect = require('chai').expect;
const app = require('../src/app.js');

const size = 10;
const items = [
  { size: 6, value: 5 },
  { size: 3, value: 1 },
  { size: 4, value: 4 },
  { size: 2, value: 2 }
];

describe('Knapsack problem solution', () => {
  it('Should calculate optimal list of items that fit', () => {
    let expected = [
      { size: 6, value: 5 },
      { size: 4, value: 4 }
    ];
    let result1 = app.greatestKnapsackValue(items, size);
    let result2 = app.smallestKnapsackValue(items, size);

    expect(result1.length).to.be.equal(expected.length);
    expected.forEach((item) => {
      expect(result1).to.include(item);
    });
  });
});
