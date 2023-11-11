// Importación de modulos
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const PORT = process.env.SERVER_PORT || 8080;
const db = require('./database/db.database');

//Configuraciones globales
dotenv.config({ path: '../.env' });
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public/')));

app.use((req, res) => {
    res.send("Hola Mundo desde la api de von haus lola mora");
});


app.listen(PORT, (error) => {
    if (error)
        console.log(`Hubo un error al iniciar el servidor: ${error}`);
    else
        console.log(`Server stablished on port: ${PORT}`);
});