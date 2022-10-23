import {Request, Response} from "express";

export default interface MessageController {
    sendMessage(req: Request, res: Response): void;
    viewMessagesSentByUser(req: Request, res: Response): void;
    viewMessagesReceivedByUser(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
    updateMessage(req: Request, res: Response): void;
    viewMessagesBetweenUsers(req: Request, res: Response): void;
}