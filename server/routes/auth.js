const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/logout', authController.logout);

router.post('/login', authController.login);

module.exports = router;
