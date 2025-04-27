// middleware/upload.js
const multer = require('multer');

// Memory storage (we'll directly upload to Cloudinary from memory)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
