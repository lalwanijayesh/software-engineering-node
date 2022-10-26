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
const FollowModel_1 = __importDefault(require("../mongoose/FollowModel"));
/**
 * @class FollowDao Implements Data Access Object managing data
 * storage of Follows.
 * @property {FollowDao} followDao private single instance of FollowDao
 */
class FollowDao {
    constructor() { }
    /**
     * Inserts a Follow instance into the database
     * @param {string} uid Primary key of the user that is following
     * @param {string} fuid Primary key of the user that is being followed
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsAnotherUser(uid, fuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .create({
                userFollowed: fuid,
                userFollowing: uid
            });
        });
    }
    /**
     * Removes an existing Follow instance from the database
     * @param {string} uid Primary key of the user that is following
     * @param {string} fuid Primary key of the user that is being followed
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowsAnotherUser(uid, fuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .deleteOne({
                userFollowed: fuid,
                userFollowing: uid
            });
        });
    }
    /**
     * Uses FollowModel to retrieve users that follow a specified user
     * @param {string} uid Primary key of the user that is followed
     * @returns Promise To be notified when follows are retrieved from the database
     */
    findAllUsersThatFollowUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ userFollowed: uid })
                .populate('userFollowing', 'username')
                .exec();
        });
    }
    /**
     * Uses Follow Model to retrieve users that are followed by a specified user
     * @param {string} uid Primary key of the user that is following
     * @returns Promise To be notified when follows are retrieved from the database
     */
    findAllUsersFollowedByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ userFollowing: uid })
                .populate('userFollowed', 'username')
                .exec();
        });
    }
    /**
     * Uses FollowModel to check if specified user is following another user
     * @param {string} uid Primary key of the user that is following
     * @param {string} fuid Primary key of the user that is being followed
     * @returns Promise To be notified when follow is retrieved from the database
     */
    findUserFollowsAnotherUser(uid, fuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .findOne({
                userFollowed: fuid,
                userFollowing: uid
            })
                .populate('userFollowed', 'username')
                .populate('userFollowing', 'username')
                .exec();
        });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * Creates singleton DAO instance.
 * @returns FollowDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.followDao == null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
;
//# sourceMappingURL=FollowDao.js.map