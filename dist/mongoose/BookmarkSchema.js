"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema to CRUD
 * documents in the bookmarks collection.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const BookmarkSchema = new mongoose_1.default.Schema({
    bookmarkedTuit: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'TuitModel',
        required: true
    },
    bookmarkedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
}, { collection: 'bookmarks' });
exports.default = BookmarkSchema;
//# sourceMappingURL=BookmarkSchema.js.map