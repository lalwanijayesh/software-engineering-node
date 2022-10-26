/**
 * @file Declares interface for RESTful web services related to messages.
 */
import {Request, Response} from "express";

export default interface MessageController {
    userMessagesAnotherUser(req: Request, res: Response): void;
    findMessagesSentByUser(req: Request, res: Response): void;
    findMessagesReceivedByUser(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
    updateMessage(req: Request, res: Response): void;
    findMessagesBetweenUsers(req: Request, res: Response): void;
};