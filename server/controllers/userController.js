const User = require('../models/user');
const validation = require('../middleware/validation');
const passport = require('passport');

exports.login = [
  validation,
  passport.authenticate('local'),
  (req, res, next) => {
    console.log(req.user);
    res.status(200).json({
      username: req.user.username
    });
  }
];

exports.signup = [
  validation,
  (req, res, next) => {
    User.find({ username: req.body.username })
      .then(username => {
        if (username) return res.status(401).json({ message: 'Username already exists.' });
        
        const user = new User({
          username: req.body.username,
          password: req.body.password,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          age: req.body.age,
        });
        
        user.save()
          .then(() => {
            res.status(200).send();
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  }
];