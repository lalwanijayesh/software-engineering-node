"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema to CRUD
 * documents in the tuits collection.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const TuitSchema = new mongoose_1.default.Schema({
    tuit: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    postedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
}, { collection: 'tuits' });
exports.default = TuitSchema;
//# sourceMappingURL=TuitSchema.js.map