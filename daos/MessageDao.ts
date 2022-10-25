/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB.
 */
import MessageDaoI from "../interfaces/MessageDao"
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data
 * storage of Messages.
 * @property {MessageDao} messageDao private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance.
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    };
    private constructor() {}

    /**
     * Inserts message instance into the database
     * @param {string} uid Primary key of the user that sends the message
     * @param {string} ruid Primary key of the user that string the message
     * @param {string} message message context that is being sent
     * @returns Promise To be notified when message is inserted into the database
     */
    async userMessagesAnotherUser(uid: string, ruid: string, message: string): Promise<Message> {
        return MessageModel
            .create({
                message: message,
                from: uid,
                to: ruid
            });
    }

    /**
     * Uses MessageModel to retrieve messages that are sent by a specified user
     * @param {string} uid Primary key of the user that sent the messages
     * @returns Promise To be notified when messages are retrieved from the database
     */
    async findMessagesSentByUser(uid: string): Promise<Message[]> {
        return MessageModel
            .find({from: uid})
            .populate('to', 'username')
            .exec();
    }
    /**
     * Uses MessageModel to retrieve messages that are sent to a specified user
     * @param {string} uid Primary key of the user to whom the messages are sent
     * @returns Promise To be notified when messages are retrieved from the database
     */
    async findMessagesReceivedByUser(uid: string): Promise<Message[]> {
        return MessageModel
            .find({to: uid})
            .populate('from', 'username')
            .exec();
    }

    /**
     * Removes an existing message from the database
     * @param {string} mid Primary key of the message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    async deleteMessage(mid: string): Promise<any> {
        return MessageModel.deleteOne({_id: mid});
    }

    /**
     * Updates an existing message in the database with new values
     * @param {string} mid Primary key of the message to be updated
     * @param {string} message Updated message content
     * @returns Promise To be notified when message is updated in the database
     */
    async updateMessage(mid: string, message: string): Promise<any> {
        return MessageModel.updateOne({_id: mid},
            {$set: {message: message}}
        );
    }

    /**
     * Uses MessageModel to retrieve messages exchanged between two users
     * @param {string} uid Primary key of the user that sent the messages
     * @param {string} ruid Primary key of the user that received the messages
     * @returns Promise To be notified when messages are retrieved from the database
     */
    async findMessagesBetweenUsers(uid: string, ruid: string): Promise<Message[]> {
        return MessageModel
            .find({$or: [{from: uid}, {from: ruid}]})
            .populate('from', 'username')
            .populate('to', 'username')
            .exec();
    }
}