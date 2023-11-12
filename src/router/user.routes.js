const Controller = require('../controllers/user.controllers');
const express = require('express');
const route = express.Router();
const {Authentication} = require('../middlewares/jwt.middleware');

route.post('/login', Controller.userLogin);
route.get('/panel', Authentication ,Controller.adminPanel);

module.exports = route;