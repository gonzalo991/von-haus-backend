const Controller = {}
const Article = require('../models/articulo.model');

Controller.getArticle = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (err) {
        res.status(400).json(`Ocurrio un error al cargar los articulos : ${err}`)
        console.error(`Ocurrio un error al cargar los articulos : ${err}`);
    } finally {
        console.log('Se utilizó el controlador getArticle')
    }
}

Controller.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.status(200).json(article);
    } catch (error) {
        res.status(404).json(`No se encontró el articulo: ${error}`);
        console.error(`No se encontró el articulo: ${error}`)
    } finally {
        console.log("Se utilizó el controlador getArticleById");
        console.log(req.params.id);
    }
}

Controller.addArticle = async (req, res) => {
    try {
        const { titulo, subtitulo, image, texto } = req.body;

        // Verificar si hay un archivo adjunto
        if (!req.file) {
            return res.status(400).json('No se proporcionó ninguna imagen.');
        }

        const {buffer} = req.file;
        const nuevoArticulo = new Article({
            titulo,
            subtitulo,
            image: buffer,
            texto
        });

        const articulo = await nuevoArticulo.save();

        res.status(200).json(`Artículo publicado correctamente: ${articulo}`);

    } catch (err) {
        res.status(400).json(`Ocurrió un error al agregar el articulo: ${err}`);
        console.error(`Ocurrió un error al agregar el articulo: ${err}`);
    } finally {
        console.log("Se intento agregar un articulo con el controlador addArticle");
    }
}

Controller.editArticle = async (req, res) => {
    try {
        // Recibimos los parametros del formulario
        const { titulo, subtitulo, texto } = req.body;

        //Creamos una lista con los valores que recibimos del formulario
        const editar_articulo = { titulo, subtitulo, texto };

        console.log(req.params.id);

        console.log(editar_articulo);

        // Realizamos la consulta a la base de datos enviando el id para poder modificar el documento
        // Cambia la línea siguiente
        await Article.findByIdAndUpdate(req.params.id, editar_articulo);

        res.status(200).json(`Articulo actualizado`); // Devolvemos un estado de confirmación de la consulta
    } catch (error) {
        // Devuelvo el estado del error junto con el mensaje
        res.status(404).json(`Ocurrió un error al editar el articulo: ${error}`);

        // Imprimo el mensaje por consola
        console.error(`Ocurrió un error al editar el arituclo: ${error}`);
    } finally {
        // Imprimo un mensaje por consola para confirmar que la función funciona correctamente
        console.log("Se utilizó el controlador editArticle");
    }
}

Controller.deleteArticle = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.status(200).json("Articulo borrado correctamente");
    } catch (error) {
        res.status(404).json(`Ocurrió un error al borrar el articulo: ${error}`);
        console.error(`Ocurrió un error al borrar el articulo: ${error}`);
    } finally {
        console.log("Se utilizó el controlador deleteArticle");
    }
}

module.exports = Controller;