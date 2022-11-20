/**
 * @file Implements mongoose schema to CRUD
 * documents in the dislikes collection.
 */
import mongoose from "mongoose";

const DislikeSchema = new mongoose.Schema({
    tuit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TuitModel',
        required: true
    },
    dislikedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
}, {collection: 'dislikes'});

export default DislikeSchema;