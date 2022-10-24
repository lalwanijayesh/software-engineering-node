import FollowControllerI from "../interfaces/FollowController";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController == null) {
            FollowController.followController = new FollowController();
            app.post('/users/:uid/follows/:fuid', FollowController.followController.userFollowsAnotherUser);
            app.delete('/users/:uid/follows/:fuid', FollowController.followController.userUnfollowsAnotherUser);
            app.get('/users/:uid/following', FollowController.followController.findAllUsersFollowedByUser);
            app.get('/users/:uid/followers', FollowController.followController.findAllUsersThatFollowUser);
            app.get('/users/:uid/follows/:fuid', FollowController.followController.findUserFollowsAnotherUser);
        }
        return FollowController.followController;
    }
    private constructor() {}

    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(follows => res.json(follows));

    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(status => res.json(status));

    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    findAllUsersThatFollowUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowUser(req.params.uid)
            .then(follows => res.json(follows));

    findUserFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.findUserFollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(follows => res.json(follows));

};