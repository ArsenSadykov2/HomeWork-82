import mongoose from 'mongoose';
import express from "express";
import cors from "cors";
import artistRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import trackRouter from "./routers/tracks";
import usersRouter from "./routers/users";
import trackHistoryRouter from "./routers/trackHistorys";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/trackHistories', trackHistoryRouter);
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

