/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB.
 */
import BookmarkDaoI from "../interfaces/BookmarkDao";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data
 * storage of Bookmarks.
 * @property {BookmarkDao} bookmarkDao private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance.
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao == null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    };
    private constructor() {}

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid Primary key of the user that bookmarks a tuit
     * @param {string} tid Primary key of the tuit that is bookmarked
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    async userBookmarksTuit(uid: string, tid: string): Promise<Bookmark> {
        return BookmarkModel.create({
            bookmarkedTuit: tid,
            bookmarkedBy: uid
        });
    }

    /**
     * Removes an existing bookmark from the database
     * @param {string} uid Primary key of the user that bookmarked the tuit
     * @param {string} tid Primary key of the tuit that was bookmarked
     * @returns Promise To be notified when bookmark is removed from the database
     */
    async userUnbookmarksTuit(uid: string, tid: string): Promise<any> {
        return BookmarkModel.deleteOne({
            bookmarkedTuit: tid,
            bookmarkedBy: uid
        });
    }

    /**
     * Uses BookmarkModel to retrieve all tuits bookmarked by a specified user
     * @param {string} uid Primary key of the user that bookmarked
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    async findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]> {
        return BookmarkModel.find({bookmarkedBy: uid})
            .populate('bookmarkedTuit', 'tuit')
            .exec();
    }

    /**
     * Uses BookmarkModel to retrieve all users that bookmarked a specified tuit
     * @param {string} tid Primary Key of the tuit
     * @returns Promise To be notified when users are retrieved from the database
     */
    async findAllUsersThatBookmarkedTuit(tid: string): Promise<Bookmark[]> {
        return BookmarkModel.find({bookmarkedTuit: tid})
            .populate('bookmarkedBy', 'username')
            .exec();
    }

    /**
     * Uses BookmarkModel to check if specified user bookmarked a particular tuit
     * @param {string} uid Primary key of the user that bookmarked the tuit
     * @param {string} tid Primary key of the tuit that is bookmarked
     * @returns Promise To be notified when bookmark is retrieved from the database
     */
    async findUserBookmarkedTuit(uid: string, tid: string): Promise<Bookmark> {
        return BookmarkModel
            .findOne({
                bookmarkedTuit: tid,
                bookmarkedBy: uid
            })
            .populate('bookmarkedTuit', 'tuit')
            .populate('bookmarkedBy', 'username')
            .exec();
    }
};