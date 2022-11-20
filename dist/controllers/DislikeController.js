"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DislikeDao_1 = __importDefault(require("../daos/DislikeDao"));
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
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
class DislikeController {
    constructor() {
        /**
         * Retrieves all users from database that disliked a particular tuit
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array containing the user objects
         */
        this.findAllUsersThatDislikedTuit = (req, res) => DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
            .then(dislikes => res.json(dislikes));
        /**
         * Retrieves all tuits from database disliked by a particular user
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user that disliked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of tuit objects disliked by the user
         */
        this.findAllTuitsDislikedByUser = (req, res) => DislikeController.dislikeDao.findAllTuitsDislikedByUser(req.params.uid)
            .then(dislikes => res.json(dislikes));
        /**
         * Creates a new dislike instance
         * @param {Request} req Represents request from client, including path
         * parameter uid and tid, identifying the user and the disliked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new dislike instance inserted in the database
         */
        this.userDislikesTuit = (req, res) => DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
            .then(dislikes => res.json(dislikes));
        /**
         * Removes an existing dislike instance
         * @param {Request} req Represents request from client, including path
         * parameters uid and tid,identifying the user and the tuit disliked
         * @param {Response} res Represents response to client, including status
         * on whether the dislike instance was succesfully deleted or not
         */
        this.userUndislikesTuit = (req, res) => DislikeController.dislikeDao.userUndislikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));
        /**
         * Toggles tuit dislike by user by adding/removing dislike instance and updating
         * respective stats values for the tuit instance
         * @param {Request} req Represents request from client, including path
         * parameter uid and tid, identifying the user and the tuit
         * @param {Response} res Represents response to client, including the
         * status code whether the operation was performed successfully or not
         */
        this.userTogglesTuitDislikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            const profile = req.session['profile'];
            const userId = uid === 'me' && profile ?
                profile._id : uid;
            try {
                const userAlreadyDislikedTuit = yield DislikeController.dislikeDao
                    .findUserDislikesTuit(userId, tid);
                const howManyDislikedTuit = yield DislikeController.dislikeDao
                    .countHowManyDislikedTuit(tid);
                let tuit = yield DislikeController.tuitDao
                    .findTuitById(tid);
                if (userAlreadyDislikedTuit) {
                    yield DislikeController.dislikeDao.userUndislikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit - 1;
                }
                else {
                    yield DislikeController.dislikeDao.userDislikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit + 1;
                    // if user liked that tuit before, undo like and update like stats also
                    const userLikedTuit = yield DislikeController.likeDao
                        .findUserLikesTuit(userId, tid);
                    if (userLikedTuit) {
                        const howManyLikedTuit = yield DislikeController.likeDao
                            .countHowManyLikedTuit(tid);
                        yield DislikeController.likeDao.userUnlikesTuit(userId, tid);
                        tuit.stats.likes = howManyLikedTuit - 1;
                    }
                }
                yield DislikeController.tuitDao.updateStats(tid, tuit.stats);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
}
exports.default = DislikeController;
DislikeController.dislikeDao = DislikeDao_1.default.getInstance();
DislikeController.likeDao = LikeDao_1.default.getInstance();
DislikeController.tuitDao = TuitDao_1.default.getInstance();
DislikeController.dislikeController = null;
/**
 * Create singleton controller instance
 * @param {Express} app Express instance to declare the RESTful web service API
 * @returns DislikeController
 */
DislikeController.getInstance = (app) => {
    if (DislikeController.dislikeController == null) {
        DislikeController.dislikeController = new DislikeController();
        app.get('/tuits/:tid/dislikes', DislikeController.dislikeController.findAllUsersThatDislikedTuit);
        app.get('/users/:uid/dislikes', DislikeController.dislikeController.findAllTuitsDislikedByUser);
        app.post('/users/:uid/dislikes/:tid', DislikeController.dislikeController.userDislikesTuit);
        app.delete('/users/:uid/dislikes/:tid', DislikeController.dislikeController.userUndislikesTuit);
        app.put('/users/:uid/dislikes/:tid', DislikeController.dislikeController.userTogglesTuitDislikes);
    }
    return DislikeController.dislikeController;
};
;
//# sourceMappingURL=DislikeController.js.map