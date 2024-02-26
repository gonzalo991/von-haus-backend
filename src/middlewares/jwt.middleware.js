const jwt = require('jsonwebtoken');

// Clave secreta para firmar y verificar tokens de autenticación
const JwtKey = process.env.JWT;

/**
 * Middleware para la autenticación de tokens.
 * @function Authentication
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - La función de siguiente middleware.
 * @returns {void}
 */
const Authentication = (req, res, next) => {
    // Obtener el token de autenticación del encabezado de la solicitud
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    // Si existe un token y comienza con 'Bearer ', eliminar 'Bearer ' para obtener solo el token.
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    // Verificar si el token existe
    if (!token) {
        res.status(401).json({ errMsg: 'Se requiere un token de autenticación' });
        return;
    }

    // Verificar y decodificar el token
    jwt.verify(token, JwtKey, (err, decoded) => {
        if (err) {
            res.status(401).json({ errMsg: `Token de autenticación inválido: ${err}` });
        } else {
            // Si la verificación es exitosa, agregar el token decodificado al objeto de solicitud y pasar al siguiente middleware
            req.decodedToken = decoded;
            next();
        }
    });
}

module.exports = { Authentication };