const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/secureRoute', userController.secureRoute);
router.post('/secureRoute2', userController.secureRoute2);
router.post('/secureRoute3', userController.secureRoute3);

module.exports = router;
