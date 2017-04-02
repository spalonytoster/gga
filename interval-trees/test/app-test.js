// jshint esversion: 6, node: true, strict: true
/* globals describe, context, it */
'use strict';
const expect = require('chai').expect;
const app = require('../src/app.js');

describe('App', () => {
  context('Given these inputs...', () => {
    it('Should be able to...', () => {
      expect(1).to.be.equal(1);
    });
  });
});
