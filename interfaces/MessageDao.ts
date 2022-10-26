/**
 * @file Declares interface for Messages related data access object methods.
 */
import Message from "../models/Message";

export default interface MessageDao {
    userMessagesAnotherUser(uid: string, ruid: string, message: string): Promise<Message>;
    findMessagesSentByUser(uid: string): Promise<Message[]>;
    findMessagesReceivedByUser(uid: string): Promise<Message[]>;
    deleteMessage(mid: string): Promise<any>;
    updateMessage(mid: string, message: string): Promise<any>;
    findMessagesBetweenUsers(uid: string, ruid: string): Promise<Message[]>;
};