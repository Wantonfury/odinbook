const User = require('../models/user');
const validation = require('../middleware/validation');
const passport = require('passport');

exports.secureRoute = (req, res, next) => {
  if (req.isAuthenticated()) return res.send("Allowed.");
  res.send("Not allowed.");
}