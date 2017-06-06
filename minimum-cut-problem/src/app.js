'use strict';
const _ = require('lodash');

// function random(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// graph is a collection of verges - every verge knows which whom it is connected with
function randomMinCut(graph) {
  let iteration = 1;
  let size;

  while ((size = _.size(graph)) > 2) {
    console.log(`----------------- iteration ${iteration} -----------------`);
    console.log('all verges');
    console.log(Object.keys(graph));
    let xKey = _.sample(Object.keys(graph));
    let yKey = _.sample(graph[xKey]);
    console.log(xKey);
    console.log(graph[xKey]);
    console.log(yKey);
    console.log(graph[yKey]);

    let X = _.reject(graph[xKey], (verge) => verge === yKey);
    let Y = _.reject(graph[yKey], (verge) => verge === xKey);
    let newVerge = _.uniq(_.concat(X, Y));

    delete graph[xKey];
    delete graph[yKey];

    let key = 'X' + iteration++;
    graph[key] = newVerge;

    _.forEach(graph, (vergeObject, vergeKey) => {
      vergeObject.forEach((verge, i, arr) => {
        if (verge === xKey || verge === yKey) {
          arr[i] = key;
        }
      });
    });

    console.log('new verge:');
    console.log(newVerge);

    console.log(graph);
    if (iteration === ) {
      break;
    }
  }
  return graph;
}

module.exports = { randomMinCut };
