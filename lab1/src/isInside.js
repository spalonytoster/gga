// jshint esversion: 6
const det = require('robust-determinant-3');

function toPoints(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = new Point(array[i][0], array[i][1]);
  }
}

function createMatrix(p, q, r) {
  return [
    [p.x,    p.y,    1],
    [q.x,    q.y,    1],
    [r.x,    r.y,    1]
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

function isPointInsidePolygon(coords, verges) {
  verges = toPoints(verges);
  let point = new Point(coords[0], coords[1]);
  let crosses = 0;

  verges.forEach((verge, i) => {
    if (crossesUpwards(verge)) {
      // TODO
    }
  });

  return crosses % 2 === 1;
}

// kolejnosc musi byc zgodna z ruchem wskazowek zegara
// let polygon = [
//   [0,0], [0, 6], [20, 6], [20, 2], [22, 4], [22, 2], [24, 2], [24, 4],
//   [26, 4], [26, 0], [20, 0], [18, 2], [18, 0], [16, 2], [16, 0], [14, 0],
//   [14, 2], [12, 2], [12, 4], [10, 2], [10, 4], [8, 4], [8, 2], [6, 2],
//   [6, 0], [4, 0], [4, 2], [2, 2], [2, 0]
// ];
// let point = [25, 2];
//
// console.log(`polygon's verges: `, polygon);
// console.log('--------------');
// console.log('point: ', point);
// console.log(isPointInsidePolygon(point, polygon) ? 'is inside' : 'is outside');
// console.log('--------------');
// point = [22, 6];
// console.log('point: ', point);
// console.log(isPointInsidePolygon(point, polygon) ? 'is inside' : 'is outside');
// console.log('--------------');
// point = [11, 2];
// console.log('point: ', point);
// console.log(isPointInsidePolygon(point, polygon) ? 'is inside' : 'is outside');

// http://www.cs.tufts.edu/comp/163/notes05/point_inclusion_handout.pdf

module.exports = Point;
