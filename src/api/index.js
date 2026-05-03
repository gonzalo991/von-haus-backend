const serverless = require('serverless-http');
const app = require('../src/server');
const connectDB = require("../database/db.database");

connectDB();
module.exports = serverless(app);