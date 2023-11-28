const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
    titulo: { type: String },
    subtitulo: { type: String },
    texto: { type: String },
    image: { type: Buffer, require: true }
}, {
    timestamps: true
});

const Article = mongoose.model('articulo', ArticleSchema);

module.exports = Article;