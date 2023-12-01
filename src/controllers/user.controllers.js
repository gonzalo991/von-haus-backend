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
            console.info("Data obtained successfully");
        } else {
            console.error('Authentication failed');
            res.status(401).json('Authentication failed');
        }
    } catch (error) {
        console.error(`Error during user authentication: ${error}`);
        res.status(500).json('Internal server error');
    } finally {
        console.info("Login controller executed");
    }
};

Controller.adminPanel = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json("Administrators' data not found");
        console.error("Administrator data not found");
    } finally {
        console.info("Administrator controller executed");
    }
}

module.exports = Controller;