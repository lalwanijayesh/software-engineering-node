import MessageControllerI from "../interfaces/MessageController";
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController == null) {
            MessageController.messageController = new MessageController();
            app.post('/users/:uid/messages/:ruid', MessageController.messageController.userMessagesAnotherUser);
            app.get('/users/:uid/messages/sent', MessageController.messageController.findMessagesSentByUser);
            app.get('/users/:uid/messages/received', MessageController.messageController.findMessagesReceivedByUser);
            app.delete('/messages/:mid', MessageController.messageController.deleteMessage);
            app.put('/messages/:mid', MessageController.messageController.updateMessage);
            app.get('/users/:uid/messages/:ruid', MessageController.messageController.findMessagesBetweenUsers);
        }
        return MessageController.messageController;
    }
    private constructor() {}

    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.params.uid, req.params.ruid, req.body.message)
            .then(message => res.json(message));

    findMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    findMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then(status => res.json(status));

    updateMessage = (req: Request, res: Response) =>
        MessageController.messageDao.updateMessage(req.params.mid, req.body.message)
            .then(status => res.json(status));

    findMessagesBetweenUsers = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesBetweenUsers(req.params.uid, req.params.ruid)
            .then(messages => res.json(messages));

}