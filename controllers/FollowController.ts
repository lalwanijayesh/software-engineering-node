import FollowControllerI from "../interfaces/FollowController";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";

export default class FollowController implements FollowControllerI {
    app: Express;
    followDao: FollowDao;
    constructor(app: Express, followDao: FollowDao) {
        this.app = app;
        this.followDao = followDao;
        this.app.post('/users/:uid/follows/:fuid', this.userFollowsAnotherUser);
        this.app.delete('/users/:uid/follows/:fuid', this.userUnfollowsAnotherUser);
        this.app.get('/users/:uid/following', this.findAllUsersFollowedByUser);
        this.app.get('/users/:uid/followers', this.findAllUsersThatFollowUser);
        this.app.get('/users/:uid/follows/:fuid', this.viewUserFollowsAnotherUser);
    }
    userFollowsAnotherUser(req: Request, res: Response): void {
        this.followDao.userFollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(follows => res.json(follows));
    }
    userUnfollowsAnotherUser(req: Request, res: Response): void {
        this.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(status => res.json(status));
    }
    findAllUsersFollowedByUser(req: Request, res: Response): void {
        this.followDao.findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));
    }
    findAllUsersThatFollowUser(req: Request, res: Response): void {
        this.followDao.findAllUsersThatFollowUser(req.params.uid)
            .then(follows => res.json(follows));
    }
    viewUserFollowsAnotherUser(req: Request, res: Response): void {
        this.followDao.viewUserFollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(follows => res.json(follows));
    }
};