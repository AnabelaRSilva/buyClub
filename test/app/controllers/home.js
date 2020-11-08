'use strict';

import { expect } from 'chai';

import home from '../../../app/controllers/home.js';

describe('home routes', () => {
  it('should load', () => {
    expect(home).to.be.a('function');
  });
});
