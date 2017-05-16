'use strict';
// const _ = require('lodash');

function getOptimalItemList(items, size) {
  // initialize table
  let W = [];
  for (let i = 0; i < items.length; i++) {
    W.push([]);
  }

  // fill the table left-to-right
  items.forEach((item, i) => {
    for (let s = 0; s <= size; s++) {
      W[i][s] = calculateW(item, W, i, s);
    }
  });

  console.log(W);
  console.log('solution: ', W[items.length-1][size]);

  return [];
}

function calculateW(item, W, i, s) {
  if (i === 0) {
    if (s < item.size) {
      return 0;
    }
    else {
      return item.value;
    }
  }
  else {
    if (s < item.size) { // jesli item (a_i) jest za duzy to nie mozemy go wlozyc do plecaka
      return W[i-1][s];
    }
    else { // w przeciwnym wypadku wybieramy lepsze z rozwiazan: z lub bez item (a_i)
      return Math.max(W[i-1][s], W[i-1][s-item.size] + item.value);
    }
  }
}

module.exports = { getOptimalItemList };
