import MessageDaoI from "../interfaces/MessageDao"
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

export default class MessageDao implements MessageDaoI {
    async sendMessage(uid: String, ruid: String, message: String): Promise<Message> {
        return MessageModel
            .create({
                message: message,
                from: uid,
                to: ruid
            });
    }
    async viewMessagesSentByUser(uid: String): Promise<Message[]> {
        return MessageModel
            .find({from: uid})
            .populate('to')
            .exec();
    }
    async viewMessagesReceivedByUser(uid: String): Promise<Message[]> {
        return MessageModel
            .find({to: uid})
            .populate('from')
            .exec();
    }
    async deleteMessage(mid: String): Promise<any> {
        return MessageModel.deleteOne({_id: mid});
    }
    async updateMessage(mid: String, message: String): Promise<any> {
        return MessageModel.updateOne({_id: mid},
            {$set: {message: message}}
        );
    }
    async viewMessagesBetweenUsers(uid: String, ruid: String): Promise<Message[]> {
        return MessageModel
            .find({from: uid, to: ruid})
            .exec();
    }
}