const { body, validationResult } = require('express-validator');

const validation = [
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
    
    next();
  }
];

module.exports = validation;