"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel_1 = __importDefault(require("../mongoose/MessageModel"));
/**
 * @class MessageDao Implements Data Access Object managing data
 * storage of Messages.
 * @property {MessageDao} messageDao private single instance of MessageDao
 */
class MessageDao {
    constructor() { }
    /**
     * Inserts message instance into the database
     * @param {string} uid Primary key of the user that sends the message
     * @param {string} ruid Primary key of the user that string the message
     * @param {string} message message context that is being sent
     * @returns Promise To be notified when message is inserted into the database
     */
    userMessagesAnotherUser(uid, ruid, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .create({
                message: message,
                from: uid,
                to: ruid
            });
        });
    }
    /**
     * Uses MessageModel to retrieve messages that are sent by a specified user
     * @param {string} uid Primary key of the user that sent the messages
     * @returns Promise To be notified when messages are retrieved from the database
     */
    findMessagesSentByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ from: uid })
                .populate('to', 'username')
                .exec();
        });
    }
    /**
     * Uses MessageModel to retrieve messages that are sent to a specified user
     * @param {string} uid Primary key of the user to whom the messages are sent
     * @returns Promise To be notified when messages are retrieved from the database
     */
    findMessagesReceivedByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ to: uid })
                .populate('from', 'username')
                .exec();
        });
    }
    /**
     * Removes an existing message from the database
     * @param {string} mid Primary key of the message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteMessage(mid) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.deleteOne({ _id: mid });
        });
    }
    /**
     * Updates an existing message in the database with new values
     * @param {string} mid Primary key of the message to be updated
     * @param {string} message Updated message content
     * @returns Promise To be notified when message is updated in the database
     */
    updateMessage(mid, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.updateOne({ _id: mid }, { $set: { message: message } });
        });
    }
    /**
     * Uses MessageModel to retrieve messages exchanged between two users
     * @param {string} uid Primary key of the user that sent the messages
     * @param {string} ruid Primary key of the user that received the messages
     * @returns Promise To be notified when messages are retrieved from the database
     */
    findMessagesBetweenUsers(uid, ruid) {
        return __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ $or: [{ from: uid }, { from: ruid }] })
                .populate('from', 'username')
                .populate('to', 'username')
                .exec();
        });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
/**
 * Creates singleton DAO instance.
 * @returns MessageDao
 */
MessageDao.getInstance = () => {
    if (MessageDao.messageDao == null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
//# sourceMappingURL=MessageDao.js.map