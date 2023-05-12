const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/get_comments_all', commentsController.get_comments_all);
router.get('/get_likes', commentsController.get_likes);

router.post('/post', commentsController.post);
router.post('/like', commentsController.like);

module.exports = router;