/**
 * @file Declares interface for RESTful web services related to dislikes.
 */
import {Request, Response} from "express";

export default interface DislikeController {
    findAllUsersThatDislikedTuit(req: Request, res: Response): void;
    findAllTuitsDislikedByUser(req: Request, res: Response): void;
    userDislikesTuit(req: Request, res: Response): void;
    userUndislikesTuit(req: Request, res: Response): void;
    userTogglesTuitDislikes(req: Request, res: Response): void;
};