const serverless = require('serverless-http');
const app = require('../src/server');

module.exports = serverless(app);