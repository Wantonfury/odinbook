const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const userController = require('../controllers/userController');

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    done(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, user);
  });
});

passport.use(new LocalStrategy(function verify(username, password, done) {
  const message = 'Incorrect username or password.';
  
  User.findOne({ username })
    .then(user => {
      if (!user) return done({ message }, false);
      
      if (user.isValidPassword(password)) return done(null, user);
      done({ message }, false);
    })
    .catch(err => done(err))
}));

router.post('/login', userController.login);
router.post('/signup', userController.signup);

module.exports = router;
