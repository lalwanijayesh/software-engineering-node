import Message from "../models/Message";

export default interface MessageDao {
    sendMessage(uid: String, ruid: String, message: String): Promise<Message>;
    viewMessagesSentByUser(uid: String): Promise<Message[]>;
    viewMessagesReceivedByUser(uid: String): Promise<Message[]>;
    deleteMessage(mid: String): Promise<any>;
    updateMessage(mid: String, message: String): Promise<any>;
    viewMessagesBetweenUsers(uid: String, ruid: String): Promise<Message[]>;
};