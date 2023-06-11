const router = require('express').Router();
const chatController = require('../controllers/chatController');

router.get('/get_messages', chatController.getMessages);
router.get('/get_unread_messages_count', chatController.getUnreadMessagesCount);
router.get('/get_chat_id', chatController.getChatId);

router.post('/add_message', chatController.addMessage);

module.exports = router;