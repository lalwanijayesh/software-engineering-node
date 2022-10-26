"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeModel_1 = __importDefault(require("../mongoose/LikeModel"));
/**
 * @class LikeDao Implements Data Access Object managing data
 * storage of Likes.
 * @property {LikeDao} likeDao private single instance of LikeDao
 */
class LikeDao {
    constructor() { }
    /**
     * Uses LikeModel to retrieve all users that liked a specified tuit
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when users are retrieved from the database
     */
    findAllUsersThatLikedTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ tuit: tid })
                .populate('likedBy', 'username')
                .exec();
        });
    }
    /**
     * Uses LikeModel to retrieve all tuits liked by a specified user
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsLikedByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find(({ likedBy: uid }))
                .populate('tuit', 'tuit')
                .exec();
        });
    }
    /**
     * Insert like instance into the database
     * @param {string} uid Primary key of the user that liked the tuit
     * @param {string} tid Primary key of the tuit that was liked
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default.create({
                tuit: tid,
                likedBy: uid
            });
        });
    }
    /**
     * Removes an existing like instance from the database
     * @param {string} uid Primary key of the user that liked the tuit
     * @param {string} tid Primary key of the tuit that was liked
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default.deleteOne({
                tuit: tid,
                likedBy: uid
            });
        });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
/**
 * Creates singleton DAO instance.
 * @returns LikeDao
 */
LikeDao.getInstance = () => {
    if (LikeDao.likeDao == null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
;
//# sourceMappingURL=LikeDao.js.map