'use strict';

import chai from 'chai';
let expect = chai.expect;
import express from 'express';
import configure from '../../../config/express.js';

describe.skip('configure express', () => {
  it('should load', () => {
    expect(configure).to.be.a('function');
  });

  it('should return the app', () => {
    const app = express();

    expect(configure(app, {})).to.eql(app);
  });
});
