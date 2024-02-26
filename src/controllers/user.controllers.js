const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const JwtKey = process.env.JWT;

/**
 * Controlador para el inicio de sesión de usuario.
 * @module Controller
 */
const Controller = {};

/**
 * Realiza la autenticación del usuario.
 * @function userLogin
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Respuesta JSON con el token de autenticación.
 */
Controller.userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (user && password === user.password) {
            const payload = { userID: user._id, username: user.username }; 
            const token = jwt.sign(payload, JwtKey, { expiresIn: '2d' });

            res.status(201).json({ login: true, token, username: user.username });
            console.info("Datos obtenidos exitosamente");
        } else {
            console.error('La autenticación falló');
            res.status(401).json('La autenticación falló');
        }
    } catch (error) {
        console.error(`Error durante la autenticación del usuario: ${error}`);
        res.status(500).json('Error interno del servidor');
    } finally {
        console.info("Controlador de Inicio de Sesión ejecutado");
    }
};

/**
 * Obtiene los datos de los administradores.
 * @function adminPanel
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Respuesta JSON con los datos de los administradores.
 */
Controller.adminPanel = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json("Datos de los administradores no encontrados");
        console.error("Datos de los administradores no encontrados");
    } finally {
        console.info("Controlador de Administrador ejecutado");
    }
}

module.exports = Controller;