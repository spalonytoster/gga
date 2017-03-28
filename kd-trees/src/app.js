// jshint esversion: 6, node: true
'use strict';
const _ = require('lodash');

class KDTree {
  constructor(points, d = 0) {
    if (points.length === 1) {
      this.value = _.first(points);
    }
    else {
      if (d % 2 === 0) { // jesli d jest parzyste, podziel S na S1 i S2
        // sortowanie po x
        points.sort((a, b) => {
          return a[0] - b[0];
        });
      }
      else if (d % 2 === 1) {
        // sortowanie po y
        points.sort((a, b) => {
          return a[1] - b[1];
        });
      }
      let S1 = _.slice(points, 0, Math.ceil(points.length / 2));
      let S2 = _.slice(points, Math.ceil(points.length / 2));
      this.left = new KDTree(S1, d+1);
      this.right = new KDTree(S2, d+1);
      // this.value = _.last(S1);
    }
  }
}

function rangeSearch(data, range) {

  return [];
}

module.exports = { rangeSearch, KDTree };
