import mongoose from "mongoose";
import {imagesUpload} from "../multer";

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: imagesUpload,
    },
    description: {
        type: String,
        default: null,
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;