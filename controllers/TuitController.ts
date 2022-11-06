/**
 * @file Declares Controller for the RESTful Web service API of tuits resource.
 */

import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /tuits to retrieve all the tuit instances</li>
 *     <li>GET /tuits/:tid to retrieve a particular tuit instance</li>
 *     <li>GET /users/:uid/tuits to retrieve tuits by a particular user</li>
 *     <li>POST /users/:uid/tuits to create a new tuit instance by given user</li>
 *     <li>DELETE /tuits/:tid to remove a particular tuit instance</li>
 *     <li>PUT /tuits/:tid to modify a particular tuit instance</li>
 *     <li>DELETE /users/:uid/tuits to remove all tuits by given user</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web Service API
 */
export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    /**
     * Create singleton controller instance
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns TuitController
     */
    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController == null) {
            TuitController.tuitController = new TuitController();
            app.get('/tuits', TuitController.tuitController.findAllTuits);
            app.get('/tuits/:tid', TuitController.tuitController.findTuitById);
            app.get('/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
            app.post('/users/:uid/tuits', TuitController.tuitController.createTuit);
            app.delete('/tuits/:tid', TuitController.tuitController.deleteTuit);
            app.put('/tuits/:tid', TuitController.tuitController.updateTuit);
            app.delete('/users/:uid/tuits', TuitController.tuitController.deleteTuitsByUser);
        }
        return TuitController.tuitController;
    }
    private constructor() {}

    /**
     * Retrieves all tuits from the database and returns an array of tuits
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON array containing the tuit objects
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));

    /**
     * Retrieves a particular tuit by the primary key
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit that matches the tuit ID
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));

    /**
     * Retrieves all tuits by a particular user
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuits posted by specified user
     */
    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuits => res.json(tuits));

    /**
     * Creates a new tuit instance
     * @param {Request} req Represents request from client, including the
     * body containing the JSON object for the new tuit to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the database
     */
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.params.uid, req.body)
            .then(actualTuit => res.json(actualTuit));

    /**
     * Removes an existing tuit instance
     * @param {Request} req Represents request from client, including the path
     * parameter tid identifying the primary key of the tuit to be removed
     * @param {Response} res Represents response to client, including status
     * on whether the tuit was successfully removed or not
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));

    /**
     * Modifies an existing tuit instance
     * @param {Request} req Represents request from client, including the path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether the tuit was successfully updated or not
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));

    /**
     * Removes all existing tuit instances by a specific user
     * @param {Request} req Represents request from client, including the path
     * parameter uid identifying the primary key of the user whose tuits are to
     * removed
     * @param {Response} res Represents response to client, including status
     * on whether the tuits were successfully removed or not
     */
    deleteTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuitsByUser(req.params.uid)
            .then(status => res.json(status));
}
