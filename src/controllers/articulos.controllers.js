const Controller = {}
const Article = require('../models/articulo.model');

Controller.getArticle = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
        console.info("Articles data obtained successfully");
    } catch (err) {
        res.status(400).json(`Ocurrio un error al cargar los articulos : ${err}`)
        console.error(`Ocurrio un error al cargar los articulos : ${err}`);
    } finally {
        console.info('Get Article controller executed');
    }
}

Controller.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.status(200).json(article);
        console.info("Article's data obtained successfully");
    } catch (error) {
        res.status(404).json(`Article not found: ${error}`);
        console.error(`Article not found: ${error}`)
    } finally {
        console.info("Get Article By Id controller executed");
    }
}

Controller.addArticle = async (req, res) => {
    try {
        const { titulo, subtitulo, texto } = req.body;

        if (!req.file) {
            return res.status(400).json('Image not found.');
        }

        const image = req.file.buffer.toString('base64');

        const agregar_articulo = new Article({
            titulo, subtitulo, texto, image
        });

        const articulo = await agregar_articulo.save();

        res.status(200).json(`Article published successfully: ${articulo}`);
        console.info("Article published successfully");

    } catch (err) {

        res.status(400).json(`An error occurred during article's addition: ${err}`);
        console.error(`An error ocurred during article's addition: ${err}`);

    } finally {
        console.info("Add article controller executed");
    }
}

Controller.editArticle = async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id });

        if (!article) {
            return res.status(404).json('Article not found');
        }

        const { titulo, subtitulo, texto } = req.body;

        //Creamos una lista con los valores que recibimos del formulario
        const editar_articulo = { titulo, subtitulo, texto };

        if (!editar_articulo) {
            return res.status(404).json(`Empty values: ${editar_articulo}`);
        } else {
            // Actualiza el artículo
            await Article.findOneAndUpdate({ _id: req.params.id }, editar_articulo);
            // Recibimos los parametros del formulario
            res.status(200).json({ message: 'Article updated successfully', article: editar_articulo }); // Devolvemos un estado de confirmación de la consulta
            console.info("Article update successfully");
        }

    } catch (error) {
        // Devuelvo el estado del error junto con el mensaje
        res.status(500).json(`An error occured during update: ${error}`);

        // Imprimo el mensaje por consola
        console.error(`An error ocurred during update: ${error}`);
    } finally {
        // Imprimo un mensaje por consola para confirmar que la función funciona correctamente
        console.info("Edit Article controller executed");
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
        console.info("Delete Article controller executed");
    }
}

module.exports = Controller;