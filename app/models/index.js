import fs from 'fs';

import path from 'path';
import typeorm from 'typeorm';

import config from '../../config/config.js';

const conn = await typeorm.createConnection(config.db);

export default conn