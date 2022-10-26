"use strict";
/**
 * @file Declares Location data type representing the GPS
 * coordinates of user's location.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Location Represents the location of the associated user.
 * @property {number} latitude latitude coordinates of user
 * @property {number} longitude longitude coordinates of user
 */
class Location {
    constructor() {
        this.latitude = 0.0;
        this.longitude = 0.0;
    }
}
exports.default = Location;
;
//# sourceMappingURL=Location.js.map