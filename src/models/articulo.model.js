const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Esquema para el modelo de artículos.
 * @constant
 * @type {object}
 */
const ArticleSchema = new Schema({
    titulo: { type: String }, // Título del artículo
    subtitulo: { type: String }, // Subtítulo del artículo
    texto: { type: String }, // Contenido del artículo
    image: { type: String, require: true } // Ruta de la imagen asociada al artículo
}, {
    timestamps: true // Añade campos de timestamp (createdAt y updatedAt)
});

/**
 * Modelo de artículo utilizando el esquema definido.
 * @constant
 * @type {Model}
 */
const Article = mongoose.model('articulo', ArticleSchema);

module.exports = Article;