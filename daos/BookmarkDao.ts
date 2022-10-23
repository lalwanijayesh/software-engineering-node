import BookmarkDaoI from "../interfaces/BookmarkDao";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {
    async userBookmarksTuit(uid: string, tid: String): Promise<Bookmark> {
        return BookmarkModel.create({
            bookmarkedTuit: tid,
            bookmarkedBy: uid
        });
    }
    async userUnbookmarksTuit(uid: string, tid: String): Promise<any> {
        return BookmarkModel.deleteOne({
            bookmarkedTuit: tid,
            bookmarkedBy: uid
        });
    }
    async findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]> {
        return BookmarkModel.find({bookmarkedBy: uid})
            .populate('bookmarkedTuit')
            .exec();
    }
    async findAllUsersThatBookmarkedTuit(tid: string): Promise<Bookmark[]> {
        return BookmarkModel.find({bookmarkedTuit: tid})
            .populate('bookmarkedBy')
            .exec();
    }
    async viewUserBookmarkedTuit(uid: string, tid: String): Promise<Bookmark> {
        return BookmarkModel
            .findOne({
                bookmarkedTuit: tid,
                bookmarkedBy: uid
            })
            .populate('bookmarkedTuit')
            .populate('bookmarkedBy')
            .exec();
    }
};