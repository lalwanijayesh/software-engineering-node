/**
 * @file Declares interface for RESTful web services related to users.
 */
import {Request, Response} from "express";

export default interface UserController {
    findAllUsers(req: Request, res: Response): void;
    findUserById(req: Request, res: Response): void;
    createUser(req: Request, res: Response): void;
    deleteUser(req: Request, res: Response): void;
    updateUser(req: Request, res: Response): void;
    deleteAllUsers(req: Request, res: Response): void;
    deleteUsersByUsername(req: Request, res: Response): void;
};