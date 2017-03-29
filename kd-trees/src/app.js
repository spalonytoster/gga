// jshint esversion: 6, node: true
'use strict';
const _ = require('lodash');

class KDTree {
  constructor(points, d = 0) {
    this.d = d;
    if (points.length === 1) {
      this.value = _.first(points);
    }
    else {
      let sorted = points.slice(); // copying points array
      if (d % 2 === 0) { // jesli d jest parzyste, podziel S na S1 i S2
        // sortowanie po x
        sorted.sort((a, b) => {
          return a[0] - b[0];
        });
      }
      else if (d % 2 === 1) {
        // sortowanie po y
        sorted.sort((a, b) => {
          return a[1] - b[1];
        });
      }
      let S1 = _.slice(points, 0, Math.ceil(sorted.length / 2));
      let S2 = _.slice(points, Math.ceil(sorted.length / 2));
      this.left = new KDTree(S1, d+1);
      this.right = new KDTree(S2, d+1);
    }
  }

  search(query) {
    preprocess(this);
    return _.uniq(recur(query, this));
  }
}

function preprocess(tree) {
  tree.area = areaOfSubtree(tree);
  if (tree.left) {
    tree.left.area = areaOfSubtree(tree.left);
    preprocess(tree.left);
  }
  if (tree.right) {
    tree.right.area = areaOfSubtree(tree.right);
    preprocess(tree.right);
  }
}

function recur(query, tree) {
  let result = [];
  if (tree.left) {
    result = result.concat(visit(query, tree.left));
    result = result.concat(recur(query, tree.left));
  }
  if (tree.right) {
    result = result.concat(visit(query, tree.right));
    result = result.concat(recur(query, tree.right));
  }
  return result;
}

function visit(query, tree) {
  let result = [];
  if (intersects(query, tree.area)) {
    // plaszczyzny sie tna -wchodzimy
    if (includesArea(query, tree.area)) {
      result = result.concat(pointsWithinSubtree(tree));
    }
    else if (typeof tree.value !== 'undefined') {
      if (includesPoint(query, tree.value)) {
        result.push(tree.value);
      }
    }
  }
  return result;
}

function pointsWithinSubtree(subtree) {
  if (typeof subtree.value !== 'undefined') {
    return [subtree.value];
  }

  let points = [];
  if (subtree.left) {
    points = points.concat(pointsWithinSubtree(subtree.left));
  }
  if (subtree.right) {
    points = points.concat(pointsWithinSubtree(subtree.right));
  }
  return points;
}

function areaOfSubtree(subtree) {
  let points = pointsWithinSubtree(subtree);
  let result = {
    x: {
      min: Infinity,
      max: -Infinity
    },
    y: {
      min: Infinity,
      max: -Infinity
    }
  };

  points.forEach((point) => {
    if (point[0] > result.x.max) {
      result.x.max = point[0];
    }
    if (point[0] < result.x.min) {
      result.x.min = point[0];
    }

    if (point[1] > result.y.max) {
      result.y.max = point[1];
    }
    if (point[1] < result.y.min) {
      result.y.min = point[1];
    }
  });

  return result;
}

function intersects(A, B) {
  return A.x.min <= B.x.max && A.x.max >= B.x.min &&
    A.y.min <= B.y.max && A.y.max >= B.y.min;
}

function includesArea(A, B) {
  return A.x.min <= B.x.min && A.x.max >= B.x.max &&
          A.y.min <= B.y.min && A.y.max >= B.y.max;
}

function includesPoint(A, p) {
  return A.x.min <= p[0] <= A.x.max && A.y.min <= p[1] <= A.y.max;
}

module.exports = { KDTree, pointsWithinSubtree, areaOfSubtree };
