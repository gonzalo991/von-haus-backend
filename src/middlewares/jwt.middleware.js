const jwt = require('jsonwebtoken');
const JwtKey = process.env.JWT;

const Authentication = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    // Si existe un token, y comienza con 'Bearer ', elimina 'Bearer ' para obtener solo el token.
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (!token) {
        res.status(401).json({ errMsg: 'Authentication token is required' });
        return;
    }

    jwt.verify(token, JwtKey, (err, json) => {
        if (err) {
            res.status(401).json({ errMsg: `Invalid Authentication Token: ${err}` });
        } else {
            req.decodedToken = json
            next();
        }
    });
}

module.exports = { Authentication };