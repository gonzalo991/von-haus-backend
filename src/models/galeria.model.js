const mongoose = require('mongoose');
const { Schema } = mongoose;

const GallerySchema = new Schema({
    titulo: { type: String },
    image: { type: String, require: true },
    descripcion: { type: String }
}, {
    timestamps: true
});

const Gallery = mongoose.model('galeria', GallerySchema);

module.exports = Gallery;