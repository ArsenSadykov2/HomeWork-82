import express from "express";
import {Error} from "mongoose";
import Artist from "../models/artist";
import {imagesUpload} from "../multer";


const artistRouter = express.Router();

artistRouter.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const name = req.body.name;
        const description = req.body.description;

        const newArtist = new Artist({name, description, image: req.file ? 'images/' + req.file.filename : null });

        await newArtist.save();
        res.send(newArtist);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});



export default artistRouter;