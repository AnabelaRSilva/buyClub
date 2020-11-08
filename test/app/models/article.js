'use strict';

import { expect } from 'chai';
import article from '../../../app/models/article';

describe('article', () => {
  it('should load', () => {
    expect(article).to.be.a('function');
  });
});
