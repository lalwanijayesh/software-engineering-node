/**
 * @file Implements mongoose schema to CRUD
 * documents in the bookmarks collection.
 */
import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
    bookmarkedTuit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TuitModel',
        required: true
    },
    bookmarkedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
}, {collection: 'bookmarks'});

export default BookmarkSchema;