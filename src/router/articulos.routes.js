const Controller = require('../controllers/articulos.controllers');
const Router = require('express').Router();

Router.use('/getArticle', Controller.getArticles);
Router.use('/getArticle/:id', Controller.getArticleById);
Router.use('/addArticle', Controller.addArticle);
Router.use('/editArticle', Controller.editArticle);
Router.use('/deleteArticle', Controller.deleteArticle);


module.exports = Router;