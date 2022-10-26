"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Message Represents relationship between two users,
 * as in a user messages another user.
 * @property {string} message the message being sent
 * @property {User} from the user that sends the message
 * @property {User} to the user that string the message
 */
class Message {
    constructor() {
        this.message = '';
        this.from = null;
        this.to = null;
        this.sentOn = new Date();
    }
}
exports.default = Message;
;
//# sourceMappingURL=Message.js.map