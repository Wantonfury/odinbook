const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/get_non_friends', userController.getNonFriends);
router.get('/get_pending_friends', userController.getPendingFriends);

router.get('/get_friends', userController.getFriends);
router.post('/add_friend', userController.addFriend);

module.exports = router;
