const Controller = require('../controllers/articulos.controllers');
const express = require('express');
const route = express.Router();
const { Authentication } = require('../middlewares/jwt.middleware');
const upload = require('../middlewares/multer.middleware');

/**
 * Definición de las rutas para la gestión de artículos.
 * @namespace ArticleRoutes
 */

/**
 * @route GET /getArticles
 * @description Obtener todos los artículos.
 * @access Public
 */
route.get('/getArticles', Controller.getArticle);

/**
 * @route GET /:id
 * @description Obtener un artículo por su ID.
 * @access Public
 */
route.get('/:id', Controller.getArticleById);

/**
 * @route POST /addArticle
 * @description Agregar un nuevo artículo.
 * @access Private
 */
route.post('/addArticle', Authentication, upload.single('image'), Controller.addArticle);

/**
 * @route POST /editArticle/:id
 * @description Editar un artículo existente.
 * @access Private
 */
route.post('/editArticle/:id', Authentication, upload.single('image'), Controller.editArticle);

/**
 * @route DELETE /deleteArticle/:id
 * @description Eliminar un artículo existente.
 * @access Private
 */
route.delete('/deleteArticle/:id', Authentication, Controller.deleteArticle);

module.exports = route;