import MessageControllerI from "../interfaces/MessageController";
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";

export default class MessageController implements MessageControllerI {
    app: Express;
    messageDao: MessageDao
    constructor(app: Express, messageDao: MessageDao) {
        this.app = app;
        this.messageDao = messageDao;
        this.app.post('/users/:uid/messages/:ruid', this.sendMessage);
        this.app.get('/users/:uid/messages/sent', this.viewMessagesSentByUser);
        this.app.get('/users/:uid/messages/received', this.viewMessagesReceivedByUser);
        this.app.delete('/messages/:mid', this.deleteMessage);
        this.app.put('/messages/:mid', this.updateMessage);
        this.app.get('/users/:uid/messages/:ruid', this.viewMessagesBetweenUsers);
    }
    sendMessage(req: Request, res: Response): void {
        this.messageDao.sendMessage(req.params.uid, req.params.ruid, req.body)
            .then(message => res.json(message));
    }
    viewMessagesSentByUser(req: Request, res: Response): void {
        this.messageDao.viewMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));
    }
    viewMessagesReceivedByUser(req: Request, res: Response): void {
        this.messageDao.viewMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));
    }
    deleteMessage(req: Request, res: Response): void {
        this.messageDao.deleteMessage(req.params.mid)
            .then(status => res.json(status));
    }
    updateMessage(req: Request, res: Response): void {
        this.messageDao.updateMessage(req.params.mid, req.body)
            .then(status => res.json(status));
    }
    viewMessagesBetweenUsers(req: Request, res: Response): void {
        this.messageDao.viewMessagesBetweenUsers(req.params.uid, req.params.ruid)
            .then(messages => res.json(messages));
    }
}