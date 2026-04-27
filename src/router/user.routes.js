const Controller = require('../controllers/user.controllers');
const express = require('express');
const route = express.Router();
const { Authentication } = require('../middlewares/jwt.middleware');

/**
 * Definición de las rutas para la gestión de usuarios.
 * @namespace UserRoutes
 */

/**
 * @route POST /login
 * @description Iniciar sesión de usuario.
 * @access Public
 */
route.post('/login', Controller.userLogin);
/**
 * @route GET /panel
 * @description Obtener panel de administración de usuarios.
 * @access Private
 */
route.get('/panel', Authentication, Controller.adminPanel);

module.exports = route;