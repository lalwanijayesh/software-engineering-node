import MessageDaoI from "../interfaces/MessageDao"
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

export default class MessageDao implements MessageDaoI {
    async userMessagesAnotherUser(uid: String, ruid: String, message: String): Promise<Message> {
        return MessageModel
            .create({
                message: message,
                from: uid,
                to: ruid
            });
    }
    async findMessagesSentByUser(uid: String): Promise<Message[]> {
        return MessageModel
            .find({from: uid})
            .populate('to', 'username')
            .exec();
    }
    async findMessagesReceivedByUser(uid: String): Promise<Message[]> {
        return MessageModel
            .find({to: uid})
            .populate('from', 'username')
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
    async findMessagesBetweenUsers(uid: String, ruid: String): Promise<Message[]> {
        return MessageModel
            .find({$or: [{from: uid}, {from: ruid}]})
            .populate('from', 'username')
            .populate('to', 'username')
            .exec();
    }
}