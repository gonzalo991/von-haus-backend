const Controller = {}
const User = require('../models/user.models');
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

Controller.adminPanel = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(400).json("No se encontraron los datos del administrador");
        console.log("No se encontraron los datos del administrador");
    } finally {
        console.log("Se utilizó el controlador de admin panel");
    }
}

module.exports = Controller;