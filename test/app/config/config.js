'use strict';

import chai from 'chai';
let expect = chai.expect;
import config from '../../../config/config.js';

describe.skip('config', () => {
  it('should load', () => {
    expect(process.env.NODE_ENV).to.eql('test');

    expect(config).to.eql({
      root: config.root,
      app: {
        name: 'express-test'
      },
      port: process.env.PORT || 3000,
      db: 'sqlite://localhost/express-test-test',
      storage: config.storage
    });
  });
});
