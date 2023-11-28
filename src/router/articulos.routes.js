const Controller = require('../controllers/articulos.controllers');
const express = require('express');
const route = express.Router();
const { Authentication } = require('../middlewares/jwt.middleware');

route.get('/getArticles', Controller.getArticle);
route.get('/:id', Controller.getArticleById);
route.post('/addArticle', Authentication, Controller.addArticle);
route.post('/editArticle/:id', Authentication, Controller.editArticle);
route.delete('/deleteArticle/:id', Authentication, Controller.deleteArticle);

module.exports = route;