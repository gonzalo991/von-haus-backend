const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
    titulo: { type: String },
    subtitulo: { type: String },
    texto: { type: String },
    image: { type: String, require: true }
}, {
    timestamps: true
});

const Article = mongo.model('articulo', ArticleSchema);

module.exports = Article;