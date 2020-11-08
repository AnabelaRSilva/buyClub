

import express from 'express';
import config from './config/config.js';
import './app/models/index.js';

const app = express();

import expConfig from './config/express.js';
expConfig(app, config);
app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

