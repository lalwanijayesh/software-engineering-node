"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Bookmark Represents relationship between users and tuits,
 * as in a user bookmarks a tuit.
 * @property {Tuit} bookmarkedTuit the tuit being bookmarked
 * @property {User} bookmarkedBy the user who bookmarked the tuit
 */
class Bookmark {
    constructor() {
        this.bookmarkedTuit = null;
        this.bookmarkedBy = null;
    }
}
exports.default = Bookmark;
;
//# sourceMappingURL=Bookmark.js.map