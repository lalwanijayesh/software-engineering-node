/**
 * @file Declares interface for RESTful web services related to tuits.
 */
import {Request, Response} from "express";

export default interface TuitController {
    findAllTuits(req: Request, res: Response): void;
    findTuitById(req: Request, res: Response): void;
    findTuitsByUser(req: Request, res: Response): void;
    createTuit(req: Request, res: Response): void;
    deleteTuit(req: Request, res: Response): void;
    updateTuit(req: Request, res: Response): void;
    deleteTuitsByUser(req: Request, res: Response): void;
};