"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Dislike Represents dislikes relationship between a user and a tuit,
 * as in user dislikes a tuit.
 * @property {Tuit} tuit Tuit being disliked
 * @property {User} dislikedBy User disliking the tuit
 */
class Dislike {
    constructor() {
        this.tuit = null;
        this.dislikedBy = null;
    }
}
exports.default = Dislike;
;
//# sourceMappingURL=Dislike.js.map