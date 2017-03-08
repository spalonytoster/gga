// jshint esversion: 6, node: true
'use strict';
const det = require('robust-determinant-3');

function toPoints(array) {
  let points = [];
  array.forEach((el) => {
    points.push(new Point(el[0], el[1]));
  });
  return points;
}

function createMatrix(p, q, r) {
  return [
    [p.x, p.y, 1],
    [q.x, q.y, 1],
    [r.x, r.y, 1]
  ];
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isUpwardOf(p, q) {
    let determinant = det(createMatrix(p, q, this));
    if (Math.sign(determinant) > 0) {
      return true;
    }
    return false;
  }

  isDownwardOf(p, q) {
    let determinant1 = det(createMatrix(p, q, this));
    let determinant2 = det(createMatrix(q, p, this));
    if (Math.sign(determinant1) < 0 && determinant2 > 0) {
      return true;
    }
    return false;
  }
}

function o(p, q, r) {
  return Math.sign(det(createMatrix(p, q, r)));
}

function intersection(ls1, ls2) {
  let p = ls1.start, q = ls1.end;
  let r = ls2.start, s = ls2.end;
  return Math.sign(det(createMatrix(p, q, r))) !== Math.sign(det(createMatrix(p, q, s))) &&
    Math.sign(det(createMatrix(r, s, p))) !== Math.sign(det(createMatrix(r, s, q)));
}

function isPointInsidePolygon(coords, verges) {
  verges = toPoints(verges);
  let point = new Point(coords[0], coords[1]);
  let isInside = false;

  // promień liczony od lewej
  let ray = {
    start: new Point(-1, point.y),
    end: point
  };

  for (let i = 0; i < verges.length; i++) {
    let edge = {
      start: verges[i],
      end: verges[(i+1) % verges.length]
    };

    if (intersection(edge, ray) && (edge.start.y < ray.start.y ||
                                    edge.end.y < ray.start.y)) {
      isInside = !isInside;
    }
  }

  return isInside;
}

module.exports = {
  Point,
  isPointInsidePolygon,
  intersection
};
