const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definición del esquema de usuario
const UserSchema = new Schema({
    name: String, // Nombre del usuario
    surname: String, // Apellido del usuario
    username: String, // Nombre de usuario único
    password: String, // Contraseña del usuario
});

/**
 * Modelo de usuario para interactuar con la colección de usuarios en la base de datos.
 * @constant
 * @type {Model}
 */
const UserModel = mongoose.model('usuarios', UserSchema);

/**
 * Singleton para el modelo de usuario.
 * @class UserSingleton
 */
class UserSingleton {
    constructor() {
        if (!UserSingleton.instance) {
            this.model = UserModel; // Asignar el modelo de usuario al Singleton
            UserSingleton.instance = this;
        }

        return UserSingleton.instance;
    }
}

// Exportar el Singleton en lugar del modelo directamente
module.exports = new UserSingleton().model;