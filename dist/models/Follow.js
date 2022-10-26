"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Follow Represents relationship between two users,
 * as in a user follows another user.
 * @property {User} userFollowed the user being followed
 * @property {User} userFollowing the user who is following
 */
class Follow {
    constructor() {
        this.userFollowed = null;
        this.userFollowing = null;
    }
}
exports.default = Follow;
;
//# sourceMappingURL=Follow.js.map