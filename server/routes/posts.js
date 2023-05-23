const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/get_posts_all', postsController.get_posts_all);
router.get('/get_posts_user', postsController.get_posts_user);
router.get('/get_comments', postsController.get_comments);
router.get('/get_likes', postsController.get_likes);
router.get('/liked', postsController.liked);

router.post('/post', postsController.post);
router.post('/like', postsController.like);
router.post('/add_comment', postsController.add_comment);

module.exports = router;