/**
 * @file Declares interface for RESTful web services related to follows.
 */
import {Request, Response} from "express";

export default interface FollowController {
    userFollowsAnotherUser(req: Request, res: Response): void;
    userUnfollowsAnotherUser(req: Request, res: Response): void;
    findAllUsersFollowedByUser(req: Request, res: Response): void;
    findAllUsersThatFollowUser(req: Request, res: Response): void;
    findUserFollowsAnotherUser(req: Request, res: Response): void;
};