"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema to CRUD
 * documents in the follows collection.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const FollowSchema = new mongoose_1.default.Schema({
    userFollowed: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    userFollowing: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
}, { collection: 'follows' });
exports.default = FollowSchema;
//# sourceMappingURL=FollowSchema.js.map