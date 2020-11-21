import express from 'express';
import glob from 'glob';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compress from 'compression';
import flash from 'connect-flash';

import methodOverride from 'method-override';
import exphbs from 'express-handlebars';
import session from 'express-session'; 
import passport from 'passport';

import homeController from '../app/controllers/home.js';
import authController from '../app/controllers/authentication.js';
import quotationController from '../app/controllers/quotation.js';
import productController from '../app/controllers/products.js';

import './passport.js';

export default (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.engine('hbs', exphbs({
    layoutsDir:  config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      "noop": function(options) {
        return options.fn(this);
      }
    },
    partialsDir: [config.root + '/app/views/partials/']
  }));
  app.set('views', path.normalize(config.root + '/app/views'));
  app.set('view engine', 'hbs');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  app.use(session({
    key: 'user_sid',
    secret: 'goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session()); 
  app.use(function(req, res, next) {
    // https://stackoverflow.com/questions/22039970/global-properties-in-express-handlebars
    res.locals.user = req.user; 
    next();
})

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach((controller) => {
    ///require(controller)(app);
  });

  homeController(app);
  authController(app);
  quotationController(app);
  productController(app);

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

  return app;
};
