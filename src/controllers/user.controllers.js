const Controller = {}
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const JwtKey = process.env.JWT;


//Controlador de login
Controller.userLogin = async (req, res) => {
    //Manejo de errores
    try {
        // Recibimos las credenciales del formulario
        const { username, password } = req.body;

        console.log(`${username} ${password}`);
        //Buscamos el usuario por username
        const user = await User.findOne({ username });

        console.log(user);

        // Validación de usuario y contraseña
        if (user && password === user.password) {
            // Firma del token
            const payload = ({ userID: user._id });
            const token = jwt.sign(payload, JwtKey, { expiresIn: '2d' });
            // Respuesta satisfactoria
            res.status(201).json({ login: true, token, username, name: user.name });

        } else {
            console.log('Los datos ingresados no coinciden');
            res.status(401).json('Usuario o contraseña inválidos');
        }
    } catch (error) {
        console.log(`Error al validar el usuario: ${error}`);
        res.status(400).json(`No se pudo validar el usuario: ${error}`);
    } finally {

        console.log('Controlador login');

    }
}

module.exports = Controller;