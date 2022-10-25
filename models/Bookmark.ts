/**
 * @file Declares Bookmark data type representing relationship
 * between users and tuits, as in a user bookmarks a tuit.
 */
import Tuit from "./Tuit";
import User from "./User";

/**
 * @typedef Bookmark Represents relationship between users and tuits,
 * as in a user bookmarks a tuit.
 * @property {Tuit} bookmarkedTuit the tuit being bookmarked
 * @property {User} bookmarkedBy the user who bookmarked the tuit
 */
export default class Bookmark {
    bookmarkedTuit: Tuit | null = null;
    bookmarkedBy: User | null = null;
};