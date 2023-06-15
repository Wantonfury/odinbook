const User = require('../models/user');

exports.uploadProfileFile = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then(user => {
      if (!req.file) return res.status(400).json({ errors: ['Please provide a new profile picture.']})
      user.pfp = req.file.path;
      
      user.save()
        .then(() => res.status(200).send())
        .catch(err => next(err));
    })
}