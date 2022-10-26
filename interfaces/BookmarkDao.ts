/**
 * @file Declares interface for Bookmarks related data access object methods.
 */
import Bookmark from "../models/Bookmark";

export default interface BookmarkDao {
    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksTuit(uid: string, tid: string): Promise<any>;
    findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]>;
    findAllUsersThatBookmarkedTuit(tid: string): Promise<Bookmark[]>;
    findUserBookmarkedTuit(uid: string, tid: string): Promise<Bookmark>;
};