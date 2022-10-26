/**
 * @file Declares Tuit data type representing
 * the post made by the user on Tuiter.
 */
import User from "./User";

/**
 * @typedef Tuit Represents the tuit posted by the user.
 * @property {string} tuit tuit content as text
 * @property {Date} postedOn timestamp of the tuit
 * @property {User} postedBy user who posted the tuit
 */
export default class Tuit {
    tuit: string = '';
    postedOn: Date = new Date();
    postedBy: User | null = null;
};