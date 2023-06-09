const User = require('../models/user');
const validation = require('../utils/middleware').validation;
const passport = require('passport');
const cookieOpts = require('../utils/settings').cookieOpts;
const { generateUserData } = require('../utils/miscellaneous');

// const generateUserData = (user) => {
//   return {
//     username: user.username,
//     first_name: user.first_name,
//     last_name: user.last_name,
//     full_name: user.full_name,
//     pfp: user.pfp,
//     id: user._id
//   }
// }

exports.login = [
  validation,
  (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: info.message });
      
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(200).json(generateUserData(req.user));
      });
    })(req, res, next);
  }
];

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(generateUserData(req.user));
  }
  
  res.status(401).send();
}

exports.signup = [
  validation,
  (req, res, next) => {
    User.findOne({ username: req.body.username })
      .then(userFound => {
        if (userFound) return res.status(401).json({ message: 'Username already exists.' });
        
        const user = new User({
          username: req.body.username,
          password: req.body.password,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          age: req.body.age,
        });
        
        user.save()
          .then(() => {
            req.login(user, err => {
              if (err) return next(err);
              res.status(200).json({ username: user.username });
            });
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  }
];

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.clearCookie('connect.sid').status(200).send();
  })
}