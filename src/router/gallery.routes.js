const Controller = require('../controllers/gallery.controllers');
const express = require('express');
const route = express.Router();
const { Authentication } = require('../middlewares/jwt.middleware');
const upload = require('../middlewares/multer.middleware');

route.get('/cards', Controller.getCards);
route.post('/addCard', Authentication, upload.single('image'), Controller.addCard);
route.post('/update/:id', Authentication, Controller.updateCard);
route.delete('/delete/:id', Authentication, Controller.deleteCard);


module.exports = route;