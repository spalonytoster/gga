// jshint esversion: 6
function isPointInsidePolygon(coords, verges) {
  point = {
    x: coords[0],
    y: coords[1]
  };

  let isInside = false;
  let j = verges.length - 1;

  for (let i = 0; i < verges.length; i++) {
    let xi = verges[i][0];
    let yi = verges[i][1];

    let xj = verges[j][0];
    let yj = verges[j][1];

    let intersectionOccured = ((yi > point.y) !== (yj > point.y)) &&
      (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
    if (intersectionOccured) {
      isInside = !isInside;
    }
    j = i;
  }
  return isInside;
}

// kolejnosc musi byc zgodna z ruchem wskazowek zegara
let polygon = [[1,1], [2,3], [3,2], [3,1]];
let point = [2,2];

console.log(`polygon's verges: `, polygon);
console.log('--------------');
console.log('point: ', point);
console.log(isPointInsidePolygon(point, polygon) ? 'is inside' : 'is outside');
console.log('--------------');
point = [1,2];
console.log('point: ', point);
console.log(isPointInsidePolygon(point, polygon) ? 'is inside' : 'is outside');

// http://www.cs.tufts.edu/comp/163/notes05/point_inclusion_handout.pdf
