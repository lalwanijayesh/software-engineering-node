import Bookmark from "../models/Bookmark";

export default interface BookmarkDao {
    userBookmarksTuit(uid: string, tid: String): Promise<Bookmark>;
    userUnbookmarksTuit(uid: string, tid: String): Promise<any>;
    findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]>;
    findAllUsersThatBookmarkedTuit(tid: string): Promise<Bookmark[]>;
    findUserBookmarkedTuit(uid: string, tid: String): Promise<Bookmark>;
};