const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Directorio donde se guardarán los archivos subidos
const directory = 'public/uploads';

// Comprobar si el directorio existe, de lo contrario, crearlo de manera recursiva
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
}

/**
 * Configuración de almacenamiento de multer para subir archivos en memoria.
 * @constant
 * @type {Object}
 */
const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Directorio donde se guardarán los archivos subidos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Nombre del archivo guardado será el mismo que el original
    }
});

/**
 * Middleware de Multer para manejar la carga de archivos.
 * @constant
 * @type {Function}
 */
const upload = multer({ storage: storage });

module.exports = upload;