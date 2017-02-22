// jshint esversion: 6
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

function intersection(ls1, ls2) {
  return ls1.start.isUpwardOf(ls2.start, ls2.end) && ls1.end.isUpwardOf(ls2.start, ls2.end) ||
    ls1.start.isDownwardOf(ls2.start, ls2.end) && ls1.end.isDownwardOf(ls2.start, ls2.end);
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

    if (intersection(edge, ray)) {
      isInside = !isInside;
    }
  }

  return isInside;
}

module.exports = {
  Point,
  isPointInsidePolygon
};
