const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Esquema para el modelo de galería.
 * @constant
 * @type {object}
 */
const GallerySchema = new Schema({
    titulo: { type: String }, // Título de la imagen en la galería
    image: { type: String, require: true }, // Ruta de la imagen (requerida)
    descripcion: { type: String } // Descripción opcional de la imagen en la galería
}, {
    timestamps: true // Añade campos de timestamp (createdAt y updatedAt)
});

/**
 * Modelo de galería utilizando el esquema definido.
 * @constant
 * @type {Model}
 */
const Gallery = mongoose.model('galeria', GallerySchema);

module.exports = Gallery;