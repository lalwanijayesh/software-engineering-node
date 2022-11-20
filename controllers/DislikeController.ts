/**
 * @file Declares Controller for the RESTful Web service API of dislikes resource.
 */
import {Request, Response, Express} from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/DislikeController";
import TuitDao from "../daos/TuitDao";
import LikeDao from "../daos/LikeDao";

/**
 * @class DislikeController Implements RESTful Web service API for dislikes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /tuits/:tid/dislikes to retrieve all users that disliked a particular tuit</li>
 *     <li>GET /users/:uid/dislikes to retrieve all tuits that were disliked by a particular user</li>
 *     <li>POST /users/:uid/dislikes/:tid to create a new dislike instance</li>
 *     <li>DELETE /users/:uid/dislikes/:tid to remove a particular dislike instance</li>
 *     <li>PUT /users/:uid/dislikes/:tid to toggle tuit dislikes by a particular user</li>
 * </ul>
 * @property {DislikeDao} dislikeDao Singleton DAO implementing dislike CRUD operations
 * @property {LikeDao} likeDao Singleton DAO implementing like CRUD operations
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {DislikeController} dislikeController Singleton controller implementing
 * RESTful Web Service API
 */
export default class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeController: DislikeController | null = null;
    /**
     * Create singleton controller instance
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns DislikeController
     */
    public static getInstance = (app: Express): DislikeController => {
        if (DislikeController.dislikeController == null) {
            DislikeController.dislikeController = new DislikeController();
            app.get('/tuits/:tid/dislikes', DislikeController.dislikeController.findAllUsersThatDislikedTuit);
            app.get('/users/:uid/dislikes', DislikeController.dislikeController.findAllTuitsDislikedByUser);
            app.post('/users/:uid/dislikes/:tid', DislikeController.dislikeController.userDislikesTuit);
            app.delete('/users/:uid/dislikes/:tid', DislikeController.dislikeController.userUndislikesTuit);
            app.put('/users/:uid/dislikes/:tid', DislikeController.dislikeController.userTogglesTuitDislikes);
        }
        return DislikeController.dislikeController;
    }
    private constructor() {}

    /**
     * Retrieves all users from database that disliked a particular tuit
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array containing the user objects
     */
    findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
            .then(dislikes => res.json(dislikes));

    /**
     * Retrieves all tuits from database disliked by a particular user
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user that disliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array of tuit objects disliked by the user
     */
    findAllTuitsDislikedByUser = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findAllTuitsDislikedByUser(req.params.uid)
            .then(dislikes => res.json(dislikes));

    /**
     * Creates a new dislike instance
     * @param {Request} req Represents request from client, including path
     * parameter uid and tid, identifying the user and the disliked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislike instance inserted in the database
     */
    userDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
            .then(dislikes => res.json(dislikes));

    /**
     * Removes an existing dislike instance
     * @param {Request} req Represents request from client, including path
     * parameters uid and tid,identifying the user and the tuit disliked
     * @param {Response} res Represents response to client, including status
     * on whether the dislike instance was succesfully deleted or not
     */
    userUndislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userUndislikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));
    /**
     * Toggles tuit dislike by user by adding/removing dislike instance and updating
     * respective stats values for the tuit instance
     * @param {Request} req Represents request from client, including path
     * parameter uid and tid, identifying the user and the tuit
     * @param {Response} res Represents response to client, including the
     * status code whether the operation was performed successfully or not
     */
    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === 'me' && profile ?
            profile._id : uid
        try {
            const userAlreadyDislikedTuit = await DislikeController.dislikeDao
                .findUserDislikesTuit(userId, tid);
            const howManyDislikedTuit = await DislikeController.dislikeDao
                .countHowManyDislikedTuit(tid);
            let tuit = await DislikeController.tuitDao
                .findTuitById(tid);
            if (userAlreadyDislikedTuit) {
                await DislikeController.dislikeDao.userUndislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit - 1;
            } else {
                await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit + 1;
                // if user liked that tuit before, undo like and update like stats also
                const userLikedTuit = await DislikeController.likeDao
                    .findUserLikesTuit(userId, tid);
                if (userLikedTuit) {
                    const howManyLikedTuit = await DislikeController.likeDao
                        .countHowManyLikedTuit(tid);
                    await DislikeController.likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }
            }
            await DislikeController.tuitDao.updateStats(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
};