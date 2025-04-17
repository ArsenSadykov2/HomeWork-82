import express from "express";
import Track from "../models/track";
import Album from "../models/album";
import {Error} from "mongoose";

const trackRouter = express.Router();

trackRouter.get("/", async (req, res, next) => {
    try {
        const album = req.query.album;
        const filter = album ? { album: album } : {};

        const tracks = await Track.find(filter).populate("album");
        res.send(tracks);
    }catch(err) {
        next(err);
    }
});

trackRouter.post('/', async (req, res, next) => {
    try {
        const album = req.body.album;
        const title = req.body.title;
        const duration = req.body.duration;

        const albumId = await Album.findById(album);
        if(!albumId) {
            res.status(404).send("There is no album in list");
            return;
        }

        const newTrack = new Track({album, title, duration});
        await newTrack.save();
        res.send(newTrack);
    } catch (error) {
        if (error instanceof Error.ValidationError  || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

export default trackRouter;
