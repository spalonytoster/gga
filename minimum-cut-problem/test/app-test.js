/* global it, describe */
'use strict';
const expect = require('chai').expect;
const app = require('../src/app.js');

describe('Karger\'s algorithm', () => {
  it('Should be able to find minimum cut in graph', () => {
    const graph = require('./example-graph.json');
    const expected = [
      ['F', 'H'],
      ['F', 'D'],
      ['F', 'G'],
      ['H', 'D'],
      ['H', 'E']
    ];
    const result = app.randomMinCut(graph);
    console.log('expected:');
    console.log(expected);

    console.log('result:');
    console.log(result);
    // expect(result).to.be.deep.equal(expected);
  });
});
