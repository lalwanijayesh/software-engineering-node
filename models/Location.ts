/**
 * @file Declares Location data type representing the GPS
 * coordinates of user's location.
 */

/**
 * @typedef Location Represents the location of the associated user.
 * @property {number} latitude latitude coordinates of user
 * @property {number} longitude longitude coordinates of user
 */
export default class Location {
    latitude: number = 0.0;
    longitude: number = 0.0;
};
