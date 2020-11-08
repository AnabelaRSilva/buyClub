'use strict';

import chai from 'chai';
let expect = chai.expect;

import home from '../../../app/controllers/home.js';

describe.skip('home routes', () => {
  it('should load', () => {
    expect(home).to.be.a('function');
  });
});
