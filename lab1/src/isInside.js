// jshint esversion: 6
const robustDeterminant3 = require('robust-determinant-3');

function det(p, q, r) {
  return robustDeterminant3([
    [p.x, p.y, 1],
    [q.x, q.y, 1],
    [r.x, r.y, 1]
  ]);
}

function crossesUpwards(p, q, r) {
  let determinant = det(p, q, r);
  if (Math.sign(det) > 0) {
    return true;
  }
  return false;
}

function crossesDownwards() {
  let determinant1 = det(p, q, r);
  let determinant2 = det(q, p, r);
  if (Math.sign(det) < 0 && determinant2 > 0) {
    return true;
  }
  return false;
}

function isPointInsidePolygon(coords, verges) {
  point = {
    x: coords[0],
    y: coords[1]
  };

  let crosses = 0;
  let isInside = false;

  verges.forEach((verge, i) => {
    if (crossesUpwards(verge)) {
      // TODO
    }
  });

  return isInside;
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

module.exports = {
  crossesUpwards: crossesUpwards,
  crossesDownwards: crossesDownwards
};
