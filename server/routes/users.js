const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const userController = require('../controllers/userController');

router.post('/secureRoute', userController.secureRoute);
//router.post('/signup', userController.signup);

module.exports = router;
