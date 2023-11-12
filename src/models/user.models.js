const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definición del esquema
const UserSchema = new Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
});

// Creación del modelo
const UserModel = mongoose.model('usuarios', UserSchema);

// Creación del Singleton
class UserSingleton {
    constructor() {
        if (!UserSingleton.instance) {
            this.model = UserModel;
            UserSingleton.instance = this;
        }

        return UserSingleton.instance;
    }
}

// Exportar el Singleton en lugar del modelo directamente
module.exports = new UserSingleton().model;
