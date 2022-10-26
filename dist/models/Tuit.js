"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Tuit Represents the tuit posted by the user.
 * @property {string} tuit tuit content as text
 * @property {Date} postedOn timestamp of the tuit
 * @property {User} postedBy user who posted the tuit
 */
class Tuit {
    constructor() {
        this.tuit = '';
        this.postedOn = new Date();
        this.postedBy = null;
    }
}
exports.default = Tuit;
;
//# sourceMappingURL=Tuit.js.map