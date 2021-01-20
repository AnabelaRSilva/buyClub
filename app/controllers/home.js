import express from 'express';
const router = express.Router();
import { isAuthenticated } from '../../config/passport.js'

export default function(app) {
  app.use('/', router);
};

router.get('/', isAuthenticated, (req, res, next) => {

  var layout = "main";
  if (req.user.supplier){
    layout = "main-supplier";

  }
  res.render('index', {
    title: 'Main page',
    users: [],
    layout: layout
  });
});
