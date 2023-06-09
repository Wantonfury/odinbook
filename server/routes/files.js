const router = require('express').Router();
const fileController = require('../controllers/fileController');
const { upload } = require('../utils/multer');

router.post('/upload_profile_file', upload.single('profile'), fileController.uploadProfileFile);

module.exports = router;