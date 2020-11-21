import express from 'express';
import passport from 'passport'; 
import { isAuthenticated } from '../../config/passport.js';
import { User } from '../models/user.js';
const router = express.Router();

export default function(app) {
  app.use('/', router);
};

router.post('/login', 
    passport.authenticate('local', { 
        failureRedirect: '/login',
        successRedirect: '/',
        failureFlash: true
    }),
    function(req, res) {
        res.redirect('/');
});

router.get('/login', (req, res, next) => {
   res.render('authentication/login', {  layout: 'simple',  message: req.flash('error')});
});

router.get('/register', (req, res, next) => {
    res.render('authentication/register', {  layout: 'simple', message: req.flash('error')});
 });

router.post('/register', (req, res, next) => {
    
    var formdata = req.body;
    console.log(formdata);
    var newUser  = new User();
    Object.assign(newUser, formdata);
    newUser.save().then(c=>{
        res.redirect('/');
    })
});

router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

router.get('/profile', isAuthenticated, function(req, res) {
    res.render('authentication/profile',{user:req.user});
});

