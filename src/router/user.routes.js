const Controller = require('../controller/user.controller');
const router = require('express').Router();


router.post('/ingresar', Controller.userLogin);

module.exports = router;