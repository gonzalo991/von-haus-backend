const mongoose = require('mongoose');
const URI = process.env.DB_URI;
const DB_PORT = process.env.DB_PORT || 27017;

mongoose.connect(URI)
    .then(console.log("Database connected on port: " + DB_PORT))
    .catch(err => console.error("Database error: " + err));

module.exports = mongoose;