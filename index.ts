import mongoose from 'mongoose';
import express from "express";
import cors from "cors";
import artistRouter from "./routers/artist";
import albumsRouter from "./routers/album";
import trackRouter from "./routers/track";
import usersRouter from "./routers/users";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/artists', artistRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', trackRouter);


const run = async () => {
    await mongoose.connect('mongodb://localhost/homework-82');

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);

