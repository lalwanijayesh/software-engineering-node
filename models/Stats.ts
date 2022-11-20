/**
 * @file Declares Stats data type representing
 * the stats for a tuit.
 */
/**
 * @typedef Stats Represents the stats for a tuit.
 * @property {number} replies number of replies to the tuit
 * @property {number} retuits number of retuits of the tuit
 * @property {number} likes number of likes on the tuit
 * @property {number} dislikes number of dislikes on the tuit
 */
export default class Stats {
    replies: number;
    retuits: number;
    likes: number;
    dislikes: number;
};