/**
 * @file Declares Message data type representing relationship
 * between two users, as in a user messages another user.
 */
import User from "./User";

/**
 * @typedef Message Represents relationship between two users,
 * as in a user messages another user.
 * @property {string} message the message being sent
 * @property {User} from the user that sends the message
 * @property {User} to the user that string the message
 */
export default class Message {
    message: string | '' = '';
    from: User | null = null;
    to: User | null = null;
    sentOn: Date | null = new Date();
};