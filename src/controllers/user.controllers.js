const Controller = {}
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const JwtKey = process.env.JWT;

//Controlador de login
Controller.userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (user && password === user.password) {
            const payload = { userID: user._id, username: user.username }; 
            const token = jwt.sign(payload, JwtKey, { expiresIn: '2d' });

            res.status(201).json({ login: true, token, username: user.username });
        } else {
            console.log('Authentication failed');
            res.status(401).json('Authentication failed');
        }
    } catch (error) {
        console.log(`Error during user authentication: ${error}`);
        res.status(500).json('Internal server error');
    } finally {
        console.log('Login controller executed');
    }
};

Controller.adminPanel = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json("No se encontraron los datos del administrador");
        console.log("No se encontraron los datos del administrador");
    } finally {
        console.log("Se utilizó el controlador de admin panel");
    }
}

module.exports = Controller;