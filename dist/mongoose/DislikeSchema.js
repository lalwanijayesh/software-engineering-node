"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema to CRUD
 * documents in the dislikes collection.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const DislikeSchema = new mongoose_1.default.Schema({
    tuit: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'TuitModel',
        required: true
    },
    dislikedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
}, { collection: 'dislikes' });
exports.default = DislikeSchema;
//# sourceMappingURL=DislikeSchema.js.map