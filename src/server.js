// Importación de módulos
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const db = require('./database/db.database');
const articulosRoutes = require('./router/articulos.routes');
const cors = require('cors');

// Carga de variables de entorno
dotenv.config({ path: './.env' });

// Definición del puerto
const port = process.env.PORT;

// Configuración del middleware de registro de solicitudes HTTP
app.use(morgan('dev'));

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Middleware para manejar solicitudes de formularios codificados
app.use(express.urlencoded({ extended: false }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para permitir solicitudes de recursos compartidos entre diferentes dominios
app.use(cors({
    methods: 'OPTIONS, POST, PUT, GET, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}));

// Rutas de la aplicación
app.use('/articulos', articulosRoutes); // Rutas para la gestión de artículos
app.use('/usuarios', require('./router/user.routes')); // Rutas para la gestión de usuarios
app.use('/gallery', require('./router/gallery.routes')); // Rutas para la gestión de la galería de imágenes

// Iniciar el servidor
app.listen(port, (error) => {
    if (error)
        console.log(`Hubo un error al iniciar el servidor: ${error}`);
    else
        console.log(`Servidor establecido en el puerto: ${port}`);
});