const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

exports.get_comments_all = (req, res, next) => {
  Comment.find().populate('user', '_id').select({ _id: 0 })
    .then(comments => {
      console.log(comments);
    })
  
  res.status(200).send();
}

exports.post = [
  body('message', 'Message must be between 5 and 255 characters.')
    .trim()
    .isLength({ min: 5, max: 255 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array({ onlyFirstError: true }).map(err => err.msg)
      });
    }
    
    const comment = new Comment({
      message: req.body.message,
      user: req.user._id
    });
    
    comment.save()
      .then(comment => res.status(200).json(comment))
      .catch(err => next(err));
  }
]

exports.like = (req, res, next) => {
  
}

exports.get_likes = (req, res, next) => {
  
}