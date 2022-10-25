/**
 * @file Declares interface for RESTful web services related to likes.
 */
import {Request, Response} from "express";

export default interface LikeController {
    findAllUsersThatLikedTuit(req: Request, res: Response): void;
    findAllTuitsLikedByUser(req: Request, res: Response): void;
    userLikesTuit(req: Request, res: Response): void;
    userUnlikesTuit(req: Request, res: Response): void;
};