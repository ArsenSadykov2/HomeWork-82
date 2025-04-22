import mongoose, {HydratedDocument, Model} from "mongoose";
import {User} from "../types";
import {randomUUID} from "node:crypto";
interface TracksMethod {
    generateToken(): void;
}

type TracksHistoryModel = Model<User, {}, TracksMethod>;

const TrackHistorySchema = new mongoose.Schema<
    HydratedDocument<User>,
    TracksHistoryModel,
    TracksMethod,
    {}

>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Track",
        required: true
    },
    dateTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    token: {
        type: String,
        required: true
    }
});

TrackHistorySchema.pre('save', function(next) {
    if (!this.token) {
        this.token = randomUUID();
    }
    next();
});

TrackHistorySchema.methods.generateToken = function () {
    this.token = randomUUID();
}

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
export default TrackHistory;