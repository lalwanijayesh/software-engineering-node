"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Like Represents likes relationship between a user and a tuit,
 * as in user likes a tuit.
 * @property {Tuit} tuit Tuit being liked
 * @property {User} likedBy User liking the tuit
 */
class Like {
    constructor() {
        this.tuit = null;
        this.likedBy = null;
    }
}
exports.default = Like;
;
//# sourceMappingURL=Like.js.map