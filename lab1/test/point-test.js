// jshint esversion: 6
const assert = require('chai').assert;
const Point = require('../src/isInside.js');

const p = new Point(1, 1);
const q = new Point(3, 3);

describe('instance of Point class', () => {
  it('should tell if it is directed upward of 2 other points', () => {
    let point = new Point(1, 3);
    assert(point.isUpwardOf(p, q));
  });

  it('should tell if it is directed downward of 2 other points', () => {
    let point = new Point(3, 1);
    assert(point.isDownwardOf(p, q));
  });

  it('should tell if it is aligned inline with 2 other points', () => {
    let point = new Point(2, 2);
    assert.isFalse(point.isDownwardOf(p, q));
    assert.isFalse(point.isUpwardOf(p, q));
  });
});
