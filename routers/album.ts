import express from "express";
import {Error} from "mongoose";
import {imagesUpload} from "../multer";
import Album from "../models/album";
import Artist from "../models/artist";


const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
    try{
      const album = await Album.find();
      res.send(album);
    } catch (error) {
        next(error);
    }
});

albumRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const artist = req.body.artist;
        const title = req.body.title;
        const date = req.body.date;

        const artistId = await Artist.findById(artist);
        if(!artistId) {
            res.status(404).send("There is no album in list");
            return;
        }

        const newAlbum = new Album({artist, title, date, image: req.file ? 'images/' + req.file.filename : null});
        await newAlbum.save();
        res.send(newAlbum);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

albumRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try{
        if(!id) {
            res.status(404).send("There is no id in params");
            return;
        }

        const album = await Album.findById(id).populate('artist');
        if(!album) {
            res.status(404).send("There is no album in list");
            return;
        }
        res.send(album);
    } catch (error) {
        next(error);
    }
});



export default albumRouter;