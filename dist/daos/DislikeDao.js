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
const DislikeModel_1 = __importDefault(require("../mongoose/DislikeModel"));
/**
 * @class DislikeDao Implements Data Access Object managing data
 * storage of Dislikes.
 * @property {DislikeDao} dislikeDao private single instance of DislikeDao
 */
class DislikeDao {
    constructor() { }
    /**
     * Uses DislikeModel to retrieve all users that disliked a specified tuit
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when users are retrieved from the database
     */
    findAllUsersThatDislikedTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default
                .find({ tuit: tid })
                .populate('dislikedBy', 'username')
                .exec();
        });
    }
    /**
     * Uses DislikeModel to retrieve all tuits disliked by a specified user
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsDislikedByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default
                .find(({ dislikedBy: uid }))
                .populate('tuit', 'tuit')
                .exec();
        });
    }
    /**
     * Insert dislike instance into the database
     * @param {string} uid Primary key of the user that disliked the tuit
     * @param {string} tid Primary key of the tuit that was disliked
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikesTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default.create({
                tuit: tid,
                dislikedBy: uid
            });
        });
    }
    /**
     * Removes an existing dislike instance from the database
     * @param {string} uid Primary key of the user that disliked the tuit
     * @param {string} tid Primary key of the tuit that was disliked
     * @returns Promise To be notified when dislike is removed from the database
     */
    userUndislikesTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default.deleteOne({
                tuit: tid,
                dislikedBy: uid
            });
        });
    }
    /**
     * Uses DislikeModel to retrieve if user disliked a specified tuit
     * @param {string} uid Primary key of the user
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when dislike is retrieved from the database
     */
    findUserDislikesTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default.findOne({
                tuit: tid,
                dislikedBy: uid
            });
        });
    }
    /**
     * Uses DislikeModel to retrieve how many users disliked a specified tuit
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when count is retrieved from the database
     */
    countHowManyDislikedTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default.count({ tuit: tid });
        });
    }
}
exports.default = DislikeDao;
DislikeDao.dislikeDao = null;
/**
 * Creates singleton DAO instance.
 * @returns DislikeDao
 */
DislikeDao.getInstance = () => {
    if (DislikeDao.dislikeDao == null) {
        DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
};
;
//# sourceMappingURL=DislikeDao.js.map