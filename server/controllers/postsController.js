const Post = require('../models/post');
const { body, validationResult } = require('express-validator');
const { generatePost, generateComment } = require('../utils/miscellaneous');

exports.get_posts_all = async (req, res, next) => {
  try {
    const posts = (await Post.find().populate('user').sort({ 'date': -1 })).map(post => {
      return generatePost(post, req.user._id);
    });
    
    res.status(200).json(posts);
  } catch(err) {
    next(err);
  }
}

exports.get_posts_user = (req, res, next) => {
  Post.find({ user: req.query.id }).populate('user').sort({ 'date': -1 })
    .then(posts => res.status(200).json(posts.map(post => generatePost(post, req.user._id))));
}

exports.get_comments = (req, res, next) => {
  Post.findOne({ _id: req.query.id }).select('comments').populate('comments.user')
    .then(post => {
      res.status(200).json(post.comments.map(comment => generateComment(comment)));
    })
    .catch(err => next(err));
}

exports.add_comment = [
  body('comment', 'Comment must be between 5 and 100 characters.')
    .trim()
    .isLength({ min: 5, max: 100 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array({ onlyFirstError: true }).map(err => err.msg)
      });
    }
    
    Post.findOne({ _id: req.body.id })
      .then(post => {
        post.comments.push({
          user: req.user._id,
          comment: req.body.comment
        });
        post.save()
          .then(() => {
            res.status(200).send()
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  }
]

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
    
    const post = new Post({
      message: req.body.message,
      user: req.user._id,
      date: Date.now(),
      likes: [],
      comments: []
    });
    
    post.save()
      .then(post => res.status(200).json(post))
      .catch(err => next(err));
  }
]

exports.like = (req, res, next) => {
  Post.findOne({ _id: req.body.id })
    .then(post => {
      let liked = true;
      
      if (post.likes.indexOf(req.user._id) !== -1) {
        post.likes.pull(req.user._id);
        liked = false;
      } else {
        post.likes.push(req.user._id);
      }
      
      post.save()
        .then(() => res.status(200).json({
          likes: post.likes.length,
          liked
        }));
    });
}

exports.liked = (req, res, next) => {
  Post.findOne({ _id: req.body.id })
    .then(post => {
      if (post.likes.indexOf(req.user._id) !== -1) return res.status(200).json({ liked: true });
      res.status(200).json({ liked: false });
    });
}

exports.get_likes = (req, res, next) => {
  Post.findOne({ _id: req.body.id })
    .then(post => res.status(200).json({ likes: post.likes.length }));
}