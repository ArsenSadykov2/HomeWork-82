import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: null,
    }
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;