const multer = require('multer');

const storage = multer.memoryStorage(); // 👈 clave

const upload = multer({ storage });

module.exports = upload;