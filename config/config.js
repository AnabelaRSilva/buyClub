import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const env = process.env.NODE_ENV || 'development';
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = path.normalize(__dirname + '/..');
import { userScheme } from '../app/models/user.js'; 
import { productScheme } from '../app/models/product.js'; 
import { quotationScheme, quotationProductScheme } from '../app/models/quotation.js'; 

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
      logging: ["query", "error"],
      ssl: true,
      entities: [
        userScheme,productScheme, quotationScheme, quotationProductScheme
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
        userScheme,productScheme, quotationScheme, quotationProductScheme
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
        userScheme,productScheme, quotationScheme, quotationProductScheme
      ]
    }
  }
};

export default config[env];
