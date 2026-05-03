const Gallery = require('../models/galeria.model');

/**
 * Controlador para manejar las operaciones CRUD en tarjetas de la galería.
 * @module Controller
 */
const Controller = {};

/**
 * Obtiene todas las tarjetas de la galería.
 * @function getCards
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Respuesta JSON con las tarjetas de la galería.
 */
Controller.getCards = async (req, res) => {
    try {
        const cards = await Gallery.find();

        res.status(200).json(cards);
    } catch (error) {
        res.status(400).json(`Falló la carga de tarjetas: ${error}`);
    }
};

/**
 * Agrega una nueva tarjeta a la galería.
 * @function addCard
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Respuesta JSON confirmando la adición de la tarjeta.
 */
Controller.addCard = async (req, res) => {
    try {
        console.log(req.file); // Agrega este log para verificar la información de la imagen

        const { titulo, descripcion } = req.body;

        // Verificar si hay un archivo adjunto
        if (!req.file) {
            return res.status(400).json('Imagen no encontrada');
        }

        const image = req.file.buffer.toString('base64');

        const galleryImg = new Gallery({ titulo, image, descripcion });

        const galleryAdd = await galleryImg.save();

        res.status(201).json({
            ok: true,
            message: "Datos agregados exitosamente",
            card: galleryAdd
        });

    } catch (error) {
        res.status(500).json(`Error durante la guardia de la tarjeta: ${error}`);
        console.error(`Error durante la guardia de la tarjeta: ${error}`);
    } finally {
        console.info("Controlador de Agregar Tarjeta ejecutado");
    }
};

/**
 * Actualiza una tarjeta existente en la galería.
 * @function updateCard
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Respuesta JSON confirmando la actualización de la tarjeta.
 */
Controller.updateCard = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;

        const updateData = {
            titulo,
            descripcion
        };

        if (req.file) {
            updateData.image = req.file.buffer.toString('base64');
        }

        const updated = await Gallery.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            message: "Tarjeta actualizada",
            card: updated
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: `Error: ${error}`
        });
    }
};

/**
 * Elimina una tarjeta de la galería.
 * @function deleteCard
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @returns {Object} - Respuesta JSON confirmando la eliminación de la tarjeta.
 */
Controller.deleteCard = async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.status(200).json("Tarjeta eliminada");
        console.info("Tarjeta eliminada");
    } catch (error) {
        res.status(500).json(`Se produjo un error durante la eliminación de la tarjeta: ${error}`);
        console.error(`Se produjo un error durante la eliminación de la tarjeta: ${error}`);
    } finally {
        console.info("Controlador de Eliminar Tarjeta ejecutado");
    }
};

module.exports = Controller;