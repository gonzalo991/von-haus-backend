const mongoose = require('mongoose');

// Obtener la URI de la base de datos desde las variables de entorno
const URI = process.env.DB_URI;

// Obtener el puerto de la base de datos desde las variables de entorno, o utilizar el puerto predeterminado (27017)
const DB_PORT = process.env.DB_PORT || 27017;

// Conectar a la base de datos
mongoose.connect(URI)
    .then(console.log("Base de datos conectada en el puerto: " + DB_PORT)) // Mensaje de conexión exitosa
    .catch(err => console.error("Error de base de datos: " + err)); // Mensaje de error en caso de falla en la conexión

// Exportar el objeto de mongoose para usarlo en otros archivos
module.exports = mongoose;