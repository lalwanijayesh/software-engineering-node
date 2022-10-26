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
const BookmarkModel_1 = __importDefault(require("../mongoose/BookmarkModel"));
/**
 * @class BookmarkDao Implements Data Access Object managing data
 * storage of Bookmarks.
 * @property {BookmarkDao} bookmarkDao private single instance of BookmarkDao
 */
class BookmarkDao {
    constructor() { }
    /**
     * Inserts bookmark instance into the database
     * @param {string} uid Primary key of the user that bookmarks a tuit
     * @param {string} tid Primary key of the tuit that is bookmarked
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default.create({
                bookmarkedTuit: tid,
                bookmarkedBy: uid
            });
        });
    }
    /**
     * Removes an existing bookmark from the database
     * @param {string} uid Primary key of the user that bookmarked the tuit
     * @param {string} tid Primary key of the tuit that was bookmarked
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default.deleteOne({
                bookmarkedTuit: tid,
                bookmarkedBy: uid
            });
        });
    }
    /**
     * Uses BookmarkModel to retrieve all tuits bookmarked by a specified user
     * @param {string} uid Primary key of the user that bookmarked
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsBookmarkedByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default.find({ bookmarkedBy: uid })
                .populate('bookmarkedTuit', 'tuit')
                .exec();
        });
    }
    /**
     * Uses BookmarkModel to retrieve all users that bookmarked a specified tuit
     * @param {string} tid Primary Key of the tuit
     * @returns Promise To be notified when users are retrieved from the database
     */
    findAllUsersThatBookmarkedTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default.find({ bookmarkedTuit: tid })
                .populate('bookmarkedBy', 'username')
                .exec();
        });
    }
    /**
     * Uses BookmarkModel to check if specified user bookmarked a particular tuit
     * @param {string} uid Primary key of the user that bookmarked the tuit
     * @param {string} tid Primary key of the tuit that is bookmarked
     * @returns Promise To be notified when bookmark is retrieved from the database
     */
    findUserBookmarkedTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .findOne({
                bookmarkedTuit: tid,
                bookmarkedBy: uid
            })
                .populate('bookmarkedTuit', 'tuit')
                .populate('bookmarkedBy', 'username')
                .exec();
        });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
 * Creates singleton DAO instance.
 * @returns BookmarkDao
 */
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao == null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
;
//# sourceMappingURL=BookmarkDao.js.map