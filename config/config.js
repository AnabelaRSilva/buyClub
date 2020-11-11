import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const env = process.env.NODE_ENV || 'development';
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = path.normalize(__dirname + '/..');
import { userScheme } from '../app/models/article.js'; 
const config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-test'
    },
    port: process.env.PORT || 3000,
    db: {
      type: "postgres",
      host: "buyclub.postgres.database.azure.com",
      port: 5432,
      username: "anabela@buyclub",
      password: "buyclub!23",
      database: "buyclub",
      synchronize: true,
      logging: false,
      ssl: true,
      entities: [
        userScheme
      ]
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'express-test'
    },
    port: process.env.PORT || 3000,
    db: {
      type: "postgres",
      host: "buyclub.postgres.database.azure.com",
      port: 5432,
      username: "anabela@buyclub",
      password: "buyclub!23",
      database: "buyclub",
      synchronize: true,
      logging: false,
      ssl: true,
      entities: [
        userScheme
      ]
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-test'
    },
    port: process.env.PORT || 3000,
    db: {
      type: "postgres",
      host: "buyclub.postgres.database.azure.com",
      port: 5432,
      username: "anabela@buyclub",
      password: "buyclub!23",
      database: "buyclub",
      synchronize: true,
      logging: false,
      ssl: true,
      entities: [
        userScheme
      ]
    }
  }
};

export default config[env];
