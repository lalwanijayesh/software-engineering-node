import Message from "../models/Message";

export default interface MessageDao {
    userMessagesAnotherUser(uid: String, ruid: String, message: String): Promise<Message>;
    findMessagesSentByUser(uid: String): Promise<Message[]>;
    findMessagesReceivedByUser(uid: String): Promise<Message[]>;
    deleteMessage(mid: String): Promise<any>;
    updateMessage(mid: String, message: String): Promise<any>;
    findMessagesBetweenUsers(uid: String, ruid: String): Promise<Message[]>;
};