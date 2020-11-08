'use strict';

import chai from 'chai';
let expect = chai.expect;
import model from '../../../app/models/index.js';

describe.skip('model', () => {
  it('should load', () => {
    expect(model).to.be.a('object');
    expect(model.sequelize).to.be.a('object');
    expect(model.sequelize.models.Article).to.be.a('object');
  });
});
