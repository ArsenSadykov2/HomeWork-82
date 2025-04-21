import mongoose from "mongoose";

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface User {
    user: mongoose.Schema.Types.ObjectId;
    track: mongoose.Schema.Types.ObjectId;
    dateTime: Date;
    token: string;
}