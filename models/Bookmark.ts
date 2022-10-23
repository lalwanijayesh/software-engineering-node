import Tuit from "./Tuit";
import User from "./User";

export default class Bookmark {
    bookmarkedTuit: Tuit | null = null;
    bookmarkedBy: User | null = null;
};