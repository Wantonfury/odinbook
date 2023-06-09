const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const dest = './public';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const path = `${dest}/${req.user._id}`;
    fs.mkdirSync(path, { recursive: true });
    
    cb(null, path);
  },
  filename: function(req, file, cb) {
    cb(null, `${uuidv4()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

exports.uploadFolder = dest.slice(1);
exports.upload = upload;