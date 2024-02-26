const Article = require('../models/articulo.model');

/**
 * Módulo del controlador para manejar operaciones CRUD en artículos.
 * @module Controller
 */

const Controller = {};

/**
 * Obtiene todos los artículos.
 * @function getArticle
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Respuesta JSON con los datos de los artículos.
 */
Controller.getArticle = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
        console.info("Datos de los artículos obtenidos exitosamente");
    } catch (err) {
        res.status(400).json(`Se produjo un error al obtener los artículos: ${err}`);
        console.error(`Se produjo un error al obtener los artículos: ${err}`);
    } finally {
        console.info('Controlador de Obtener Artículo ejecutado');
    }
};

/**
 * Obtiene un artículo específico por su ID.
 * @function getArticleById
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Respuesta JSON con los datos del artículo.
 */
Controller.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.status(200).json(article);
        console.info("Datos del artículo obtenidos exitosamente");
    } catch (error) {
        res.status(404).json(`Artículo no encontrado: ${error}`);
        console.error(`Artículo no encontrado: ${error}`);
    } finally {
        console.info("Controlador de Obtener Artículo por ID ejecutado");
    }
};

/**
 * Agrega un nuevo artículo.
 * @function addArticle
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Respuesta JSON confirmando la adición del artículo.
 */
Controller.addArticle = async (req, res) => {
    try {
        const { titulo, subtitulo, texto } = req.body;

        if (!req.file) {
            return res.status(400).json('Imagen no encontrada.');
        }

        const image = req.file.buffer.toString('base64');

        const agregar_articulo = new Article({
            titulo, subtitulo, texto, image
        });

        const articulo = await agregar_articulo.save();

        res.status(200).json(`Artículo publicado exitosamente: ${articulo}`);
        console.info("Artículo publicado exitosamente");

    } catch (err) {

        res.status(400).json(`Se produjo un error durante la adición del artículo: ${err}`);
        console.error(`Se produjo un error durante la adición del artículo: ${err}`);

    } finally {
        console.info("Controlador de Agregar Artículo ejecutado");
    }
};

/**
 * Edita un artículo existente.
 * @function editArticle
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Respuesta JSON confirmando la edición del artículo.
 */
Controller.editArticle = async (req, res) => {
    try {
        const { titulo, subtitulo, texto } = req.body;

        if (titulo === undefined || subtitulo === undefined) {
            return res.status(400).json('Datos del formulario incompletos');
        }

        if (!req.file) {
            return res.status(400).json('Imagen no encontrada.');
        }

        const image = req.file.buffer.toString('base64');

        const editar_articulo = {
            titulo, subtitulo, texto, image
        };

        console.log(editar_articulo);

        if (!editar_articulo) {
            res.status(500).json(`Valores vacíos para el artículo: ${editar_articulo}`)
        } else {
            await Article.findByIdAndUpdate(req.params.id, editar_articulo);

            res.status(200).json({ message: 'Artículo actualizado exitosamente', article: editar_articulo });
            console.info('Artículo actualizado exitosamente');
        }

    } catch (error) {
        console.error(`Se produjo un error durante la actualización: ${error}`);
        res.status(500).json(`Se produjo un error durante la actualización: ${error}`);
    } finally {
        console.info('Controlador de Editar Artículo ejecutado');
    }
};

/**
 * Elimina un artículo.
 * @function deleteArticle
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Respuesta JSON confirmando la eliminación del artículo.
 */
Controller.deleteArticle = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.status(200).json("Artículo eliminado exitosamente");
    } catch (error) {
        res.status(404).json(`Se produjo un error al eliminar el artículo: ${error}`);
        console.error(`Se produjo un error al eliminar el artículo: ${error}`);
    } finally {
        console.info("Controlador de Eliminar Artículo ejecutado");
    }
};

module.exports = Controller;