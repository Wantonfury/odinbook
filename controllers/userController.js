const mongoose = require('mongoose');
const User = require('../../models/user');
const { body, validationResult } = require('express-validator');

exports.login = [
  body('username', 'Username must be at least 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('password', 'Password must be at least 8 characters.')
    .trim()
    .isLength({ min: 8 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: 'Validation Error',
        err: errors.array({ onlyFirstError: true }).map(err => err.msg)
      });
    }
    
    User.findOne({ username: req.username })
      .then(user => {
        if (!user) return res.status(401).json({ msg: 'No such username.' });
        if (!user.isValidPassword(req.password)) return res.status(401).json({ msg: 'Wrong password.'});
        
        const token = user.generateToken();
        
        res.cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none'
        }).status(200).json({ username: user.username });
      })
      .catch(err => next(err));
  }
];