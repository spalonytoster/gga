// jshint esversion: 6, node: true
/* globals it, describe*/
'use strict';
const assert = require('chai').assert;
const Point = require('../src/is-inside.js').Point;
const insidePolygon = require('../src/is-inside.js').isPointInsidePolygon;
const intersection = require('../src/is-inside.js').intersection;

describe('instance of Point class', () => {
  const p = new Point(1, 1);
  const q = new Point(3, 3);

  it('should tell if it is directed upward of 2 other points', () => {
    let point = new Point(1, 3);
    assert(point.isUpwardOf(p, q));

    point = new Point(1, 3);
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

  it('should tell if 2 lines are intersecting', () => {
    let ray = {
      start: new Point(-1, 2),
      end: new Point(0, 2)
    };
    let edge = {
      start: new Point(0, 0),
      end: new Point(0, 2)
    };
    assert.isTrue(intersection(ray, edge) && (edge.start.y < ray.start.y ||
                                              edge.end.y < ray.start.y));
  });
});

describe('main algorithm', () => {
  it('should tell if point is inside or outside the polygon', () => {
    // przypadek testowy podany na zajeciach przez prowadzacego
    // let polygon = [
    //   [0, 0], [0, 6], [20, 6], [20, 2], [22, 4], [22, 2], [24, 2], [24, 4],
    //   [26, 4], [26, 0], [20, 0], [18, 2], [18, 0], [16, 2], [16, 0], [14, 0],
    //   [14, 2], [12, 2], [12, 4], [10, 2], [10, 4], [8, 4], [8, 2], [6, 2],
    //   [6, 0], [4, 0], [4, 2], [2, 2], [2, 0]
    // ];
    //
    // assert.isTrue(insidePolygon([25, 2], polygon));
    // assert.isFalse(insidePolygon([22, 6], polygon));
    // assert.isTrue(insidePolygon([11, 2], polygon));

    let polygon = [[0, 0], [0, 2], [2, 2], [2, 0]];
    assert.isFalse(insidePolygon([0, 0], polygon));
    assert.isFalse(insidePolygon([2, 0], polygon));
    assert.isTrue(insidePolygon([0, 2], polygon));
    assert.isFalse(insidePolygon([2, 2], polygon));
    assert.isFalse(insidePolygon([4, 2], polygon));
    assert.isTrue(insidePolygon([1, 1], polygon));
  });
});
