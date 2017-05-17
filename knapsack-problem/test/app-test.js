/* global it, describe */
'use strict';
const expect = require('chai').expect;
const app = require('../src/app.js');
const _ = require('lodash');

const itemSets = require('./items-data.js');

describe('Knapsack problem solution', () => {
  it('Should calculate optimal list of items that fit', () => {
    // let expected = [
    //   { size: 6, value: 5 },
    //   { size: 4, value: 4 }
    // ];

    _.forEach(itemSets, (items) => {
      console.log('knapsack size: ', items.knapsackSize);
      console.time(items.length + ' items W');
      let result1 = app.greatestKnapsackValue(items, items.knapsackSize);
      // console.log('result: ', result1);
      console.timeEnd(items.length + ' items W');

      console.time(items.length + ' items A');
      let result2 = app.smallestKnapsackValue(items, items.knapsackSize);
      // console.log('result: ', result2);
      console.timeEnd(items.length + ' items A');
    });

    // expect(result1.length).to.be.equal(expected.length);
    // expected.forEach((item) => {
      // expect(result1).to.include(item);
    // });
  });
});
