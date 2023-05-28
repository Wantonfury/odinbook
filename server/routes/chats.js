const router = require('express').Router();
const chatController = require('../controllers/chatController');

router.get('/get_messages', chatController.getMessages);
router.post('/add_message', chatController.addMessage);
router.post('/read_messages', chatController.readMessages);

module.exports = router;