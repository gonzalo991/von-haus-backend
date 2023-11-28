const multer = require('multer');
const fs = require('fs');
const path = require('path');

const directory = 'public/uploads';

if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
}

const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;