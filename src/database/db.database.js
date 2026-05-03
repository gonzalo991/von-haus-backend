require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.DB_URI;

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(URI);

        isConnected = db.connections[0].readyState;

        console.log('Mongo conectado');
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = connectDB;