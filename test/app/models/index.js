'use strict';

import { expect } from 'chai';
import model from '../../../app/models/index.js';

describe('model', () => {
  it('should load', () => {
    expect(model).to.be.a('object');
    expect(model.sequelize).to.be.a('object');
    expect(model.sequelize.models.Article).to.be.a('object');
  });
});
