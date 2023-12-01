const Controller = {}
const Gallery = require('../models/galeria.model');

Controller.getCards = async (req, res) => {
    try {
        const card = await Gallery.find();
        res.status(200).json(card);
    } catch (error) {
        res.status(400).json(`Cards loading failed: ${error}`);
    } finally {
        res.status(200).json("Get cards controller executed");
        console.info("Get cards controller executed");
    }
}

Controller.addCard = async (req, res) => {
    try {
        console.log(req.file); // Agrega este log para verificar la información de la imagen

        const { titulo, descripcion } = req.body;

        // Verificar si hay un archivo adjunto
        if (!req.file) {
            return res.status(400).json('Image not found');
        }

        const image = req.file.buffer.toString('base64');

        const galleryImg = new Gallery({ titulo, image, descripcion });

        const galleryAdd = await galleryImg.save();

        res.status(200).json(`Data added successfully: \n ${galleryAdd}`);

    } catch (error) {
        res.status(500).json(`Error during card saving: ${error}`);
        console.error(`Error during card saving: ${error}`);
    } finally {
        res.status(200).json("Add card controller executed");
        console.info("Add card controller executed");
    }
}

Controller.updateCard = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;

        // Verificar si hay un archivo adjunto
        if (!req.file) {
            return res.status(400).json('Image not found.');
        }

        const { buffer } = req.file;
        const galleryUpdate = { titulo, image: buffer, descripcion }

        await Gallery.findByIdAndUpdate(req.params.id, galleryUpdate);

        res.status(200).json("Card successfully updated");
        console.info("Card successfully updated");

    } catch (error) {
        res.status(401).json(`An error occurred during update: \n ${error}`);
        console.error(`An error occurred during update: \n ${error}`);
    } finally {
        res.status(200).json("Update card controller executed.");
        console.info("Update card controller executed.");
    }
}

Controller.deleteCard = async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.status(200).json("Card deleted");
        console.info("Card deleted");
    } catch (error) {
        res.status(401).json(`An error occurred during card's deletion: ${error}`);
        console.error(`An error occurred during card's deletion: ${error}`);
    } finally {
        res.status(200).json("Delete card controller executed");
        console.info("Delete card controller executed");
    }
}

module.exports = Controller;