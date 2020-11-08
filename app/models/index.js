import fs from 'fs';
import path from 'path';
import { createConnection } from 'typeorm';
import config from '../../config/config.js';

const conn = await createConnection(config.db);

export default conn