/**
 * @file Declares Controller for the RESTful Web service API of messages resource.
 */
import MessageControllerI from "../interfaces/MessageController";
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/messages/:ruid to create a new message instance</li>
 *     <li>GET /users/:uid/messages/sent to retrieve all messages sent by specified user</li>
 *     <li>GET /users/:uid/messages/received to retrieve all messages received by specified user</li>
 *     <li>DELETE /messages/:mid to remove a particular message instance</li>
 *     <li>PUT /messages/:mid to modify a particular message instance</li>
 *     <li>GET /users/:uid/messages/:ruid to retrieve messages exchanged between two users</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web Service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Create singleton controller instance
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns MessageController
     */
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

    /**
     * Creates a new message instance
     * @param {Request} req Represents request from client, including path
     * parameters uid and ruid, indetifying the sender and receiver along with
     * the body containing the JSON object for the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object for the new message that is inserted in the database
     */
    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.params.uid, req.params.ruid, req.body.message)
            .then(message => res.json(message));

    /**
     * Retrieves all the messages sent by a particular user
     * @param {Request} req Represents request from client, including path
     * parameter uid, identifying the primary key of the sender user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array containing the message objects sent by the user
     */
    findMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all the messages received by a particular user
     * @param {Request} req Represents request from client, including path
     * parameter uid, identifying the primary key of the receiving user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array containing the message objects sent to the user
     */
    findMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Removes an existing message instance
     * @param {Request} req Represents request from client, including path
     * parameter mid, identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether the message was successfully removed or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then(status => res.json(status));

    /**
     * Modifies an existing message instance
     * @param {Request} req Represents request from client, including path
     * parameter mid, identifying the primary key of the message to be modified
     * along with the new message in the JSON body
     * @param {Response} res Represents response to client, including status
     * on whether message was successfully updated or not
     */
    updateMessage = (req: Request, res: Response) =>
        MessageController.messageDao.updateMessage(req.params.mid, req.body.message)
            .then(status => res.json(status));

    /**
     * Retrieves all messages exchanged between the specified users
     * @param {Request} req Represents request from client, including path
     * parameters uid and ruid, identifying the sender and the receiver of messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array containing the message objects
     */
    findMessagesBetweenUsers = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesBetweenUsers(req.params.uid, req.params.ruid)
            .then(messages => res.json(messages));

}