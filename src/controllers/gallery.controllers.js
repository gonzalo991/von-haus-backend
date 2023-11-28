const Controller = {}
const Gallery = require('../models/galeria.model');

Controller.getCards = async (req, res) => {
    try {
        const card = await Gallery.find();
        res.status(200).json(card);
    } catch (error) {
        res.status(400).json(`Ocurrio un error al cargar las tarjetas: ${error}`);
    } finally {
        console.info("Se utilizo el controlador get cards");
    }
}

Controller.addCard = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const image = req.file.originalname;

        const galleryImg = new Gallery({ titulo, image, descripcion });

        const galleryAdd = await galleryImg.save();

        res.status(200).json(`Se agrego a la base de datos: \n ${galleryAdd}`);

    } catch (error) {
        console.error(`Ocurrió un error al guardar la tarjeta: ${error}`);
    } finally {
        console.info("Se utilizo el controlador add card");
    }
}

Controller.updateCard = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const image = req.file.originalname;

        const galleryUpdate = { titulo, image, descripcion }

        console.log(req.params.id);
        console.log(galleryUpdate);

        await Gallery.findByIdAndUpdate(req.params.id, galleryUpdate);

        res.status(200).json("Tarjeta actualizada correctamente");

    } catch (error) {
        console.error(`Ocurrió un error al actualizar la tarjeta: \n ${error}`);
    } finally {
        console.info("Se utilizo el controlador update card.");
    }
}

Controller.deleteCard = async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.status(200).json("Tarjeta borrada correctamente");
    } catch (error) {
        console.error(`Ocurrió un error al borrar la tarjeta: ${error}`);
    } finally {
        console.info("Se utilizo el controlador delete card");
    }
}

module.exports = Controller;