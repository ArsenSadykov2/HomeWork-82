import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;