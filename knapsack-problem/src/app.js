'use strict';
// const _ = require('lodash');

function greatestKnapsackValue(items, size) {
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

function smallestKnapsackValue(items, size) {
  // initialize table
  let A = [];
  for (let i = 0; i < items.length; i++) {
    A.push([]);
  }

  // fill the table left-to-right
  let summedValues = items.reduce((accumulator, next) => {
    return accumulator += next.value;
  }, 0);

  items.forEach((item, i) => {
    for (let v = 0; v <= summedValues; v++) {
      A[i][v] = calculateA(item, A, i, v);
    }
  });

  let max = 0;
  for (let v = 0; v <= summedValues; v++) {
    console.log(A[items.length-1][v] <= size);
    if (A[items.length-1][v] <= size) {
      max = v;
    }
  }

  console.log(A);
  console.log('solution: ', A[items.length-1][max]);

  return [];
}

function calculateA(item, A, i, v) {
  if (v === 0) {
    return 0;
  }
  if (i === 0) {
    if (item.value === v) {
      return item.size;
    }
    else {
      return Infinity;
    }
  }
  else {
    if (v < item.value) {
      return A[i-1][v];
    }
    else {
      return Math.min(A[i-1][v], A[i-1][v-item.value] + item.size);
    }
  }
}

module.exports = { greatestKnapsackValue, smallestKnapsackValue };
