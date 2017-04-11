// jshint esversion: 6, node: true
'use strict';
const _ = require('lodash');

function median(intervals) {
  return intervals.reduce((acc, val) => acc + val[0] + val[1], 0) / (intervals.length * 2);
}

class IntervalTree {
  constructor(intervals) {
    if (intervals.length === 0) return;

    // wyznacz mediane i zapamietaj w wezle
    this.median = median(intervals);

    // wyznacz lewy, med i prawy
    let left = [];
    let middle = [];
    let right = [];
    intervals.forEach((interval) => {
      if (interval[0] < this.median && interval[1] < this.median) {
        left.push(interval);
      }
      else if (interval[0] > this.median && interval[1] > this.median) {
        right.push(interval);
      }
      else {
        middle.push(interval);
      }
    });

    // stworz dwie posortowane listy przedzialow dla middle
    // po leweym koncu
    middle.left = intervals.slice().sort();
    // po prawym koncu
    middle.right = intervals.slice().sort((a, b) => a[1] - b[1]);

    this.lists = {
      left: middle.left,
      right: middle.right
    };

    this.left = new IntervalTree(left);
    this.right = new IntervalTree(right);
  }

  isLeaf() {
    return typeof this.left === 'undefined';
  }

  query(x) {
    let result = [];
    if (this.isLeaf()) return result;
    if (x <= this.median) {
      this.lists.left.forEach((interval) => {
        if (interval[0] <= x && x <= interval[1]) {
          result.push(interval);
        }
        else {
          return;
        }
      });
      return result.concat(this.left.query(x));
    }
    else {
      this.lists.right.forEach((interval) => {
        if (interval[0] <= x && x <= interval[1]) {
          result.push(interval);
        }
        else {
          return;
        }
      });
      return result.concat(this.right.query(x));
    }
  }
}

function query(intervals, x) {
  let tree = new IntervalTree(intervals);
  return _.uniq(tree.query(x));
}

module.exports = { query, IntervalTree, median };
