import MessageControllerI from "../interfaces/MessageController";
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";

export default class MessageController implements MessageControllerI {
    app: Express;
    messageDao: MessageDao
    constructor(app: Express, messageDao: MessageDao) {
        this.app = app;
        this.messageDao = messageDao;
        this.app.post('/users/:uid/messages/:ruid', this.userMessagesAnotherUser);
        this.app.get('/users/:uid/messages/sent', this.findMessagesSentByUser);
        this.app.get('/users/:uid/messages/received', this.findMessagesReceivedByUser);
        this.app.delete('/messages/:mid', this.deleteMessage);
        this.app.put('/messages/:mid', this.updateMessage);
        this.app.get('/users/:uid/messages/:ruid', this.findMessagesBetweenUsers);
    }

    userMessagesAnotherUser = (req: Request, res: Response) =>
        this.messageDao.userMessagesAnotherUser(req.params.uid, req.params.ruid, req.body.message)
            .then(message => res.json(message));

    findMessagesSentByUser = (req: Request, res: Response) =>
        this.messageDao.findMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    findMessagesReceivedByUser = (req: Request, res: Response) =>
        this.messageDao.findMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    deleteMessage = (req: Request, res: Response) =>
        this.messageDao.deleteMessage(req.params.mid)
            .then(status => res.json(status));

    updateMessage = (req: Request, res: Response) =>
        this.messageDao.updateMessage(req.params.mid, req.body.message)
            .then(status => res.json(status));

    findMessagesBetweenUsers = (req: Request, res: Response) =>
        this.messageDao.findMessagesBetweenUsers(req.params.uid, req.params.ruid)
            .then(messages => res.json(messages));

}