import express from 'express';
const router = express.Router();
import {User} from '../models/user.js';
import { isAuthenticated } from '../../config/passport.js'

export default function(app) {
  app.use('/', router);
};

router.get('/', isAuthenticated, (req, res, next) => {

  var layout = "main";
  if (req.user.supplier){
    layout = "main-supplier";

  }
  User.find().then((users) => {
    res.render('index', {
      title: 'Generator-Express MVC --- dd',
      users: users,
      layout: layout
    });
  });
});
