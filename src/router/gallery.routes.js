const Controller = require('../controllers/gallery.controllers');
const express = require('express');
const route = express.Router();
const { Authentication } = require('../middlewares/jwt.middleware');
const upload = require('../middlewares/multer.middleware');

/**
 * Definición de las rutas para la gestión de la galería.
 * @namespace GalleryRoutes
 */

/**
 * @route GET /cards
 * @description Obtener todas las tarjetas de la galería.
 * @access Public
 */
route.get('/cards', Controller.getCards);

/**
 * @route POST /addCard
 * @description Agregar una nueva tarjeta a la galería.
 * @access Private
 */
route.post('/addCard', Authentication, upload.single('image'), Controller.addCard);

/**
 * @route POST /update/:id
 * @description Actualizar una tarjeta existente en la galería.
 * @access Private
 */
route.post('/update/:id', Authentication, Controller.updateCard);

/**
 * @route DELETE /delete/:id
 * @description Eliminar una tarjeta existente de la galería.
 * @access Private
 */
route.delete('/delete/:id', Authentication, Controller.deleteCard);

module.exports = route;