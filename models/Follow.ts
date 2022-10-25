/**
 * @file Declares Follow data type representing relationship
 * between two users, as in a user follows another user.
 */
import User from "./User";

/**
 * @typedef Follow Represents relationship between two users,
 * as in a user follows another user.
 * @property {User} userFollowed the user being followed
 * @property {User} userFollowing the user who is following
 */
export default class Follow {
    userFollowed: User | null = null;
    userFollowing: User | null = null;
};