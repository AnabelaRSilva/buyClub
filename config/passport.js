import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {  User } from '../app/models/article.js' 

export function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  function(email, password, done) {
    User.findOne({ where: { email }})
    .then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    
    User.findOne({ where: { id: id }}).then(function(user) {
        done(null, user);
    }).catch(function(err) {
        done(err, null);
    });
});