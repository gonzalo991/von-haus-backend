// Importación de modulos
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const morgan = require('morgan');
const PORT = process.env.SERVER_PORT;
const db = require('./database/db.database');
const articulosRoutes = require('./router/articulos.routes');

//Configuraciones globales
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public/')));

app.use('/articulos', articulosRoutes);
app.use('/usuarios', require('./router/user.routes'));

app.listen(PORT, (error) => {
    if (error)
        console.log(`Hubo un error al iniciar el servidor: ${error}`);
    else
        console.log(`Server stablished on port: ${PORT}`);
});