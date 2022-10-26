/**
 * @file Declares Controller for the RESTful Web service API of follows resource.
 */
import FollowControllerI from "../interfaces/FollowController";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/follows/:fuid to create a new follow instance</li>
 *     <li>DELETE /users/:uid/follows/:fuid to remove a particular follow instance</li>
 *     <li>GET /users/:uid/following to retrieve all users followed by a particular user</li>
 *     <li>GET /users/:uid/followers to retrieve all users that follow a particular user</li>
 *     <li>GET /users/:uid/follows/:fuid to check whether specified user follows another user</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing follow CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web Service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Create singleton controller instance
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns FollowController
     */
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

    /**
     * Create a new follow instance
     * @param {Request} req Represents request from client, including path
     * parameters uid and fuid, identifying the following user and the followed user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follow instance inserted in the database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(follows => res.json(follows));

    /**
     * Removes an existing follow instance
     * @param {Request} req Represents request from client, including path
     * parameters uid and fuid, identifying the following user and the followed user
     * @param {Response} res Represents response to client, including status
     * on whether the follow instance was successfully removed or not
     */
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(status => res.json(status));

    /**
     * Retrieves all the users followed by a particular user
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the following user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of user objects followed by particular user
     */
    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all the users that follow a porticular user
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the followed user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of user objects that follow particular user
     */
    findAllUsersThatFollowUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Check whether a particular user follows the given user
     * @param {Request} req Represents request from client, including path
     * parameters uid and fuid, identifying the following user and the followed user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the follow instance between the following
     * user and the followed user
     */
    findUserFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.findUserFollowsAnotherUser(req.params.uid, req.params.fuid)
            .then(follows => res.json(follows));

};