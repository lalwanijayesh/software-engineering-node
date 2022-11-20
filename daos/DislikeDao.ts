/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB.
 */
import DislikeDaoI from "../interfaces/DislikeDao";
import DislikeModel from "../mongoose/DislikeModel";
import Dislike from "../models/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data
 * storage of Dislikes.
 * @property {DislikeDao} dislikeDao private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    /**
     * Creates singleton DAO instance.
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao == null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    };
    private constructor() {}

    /**
     * Uses DislikeModel to retrieve all users that disliked a specified tuit
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when users are retrieved from the database
     */
    async findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]> {
        return DislikeModel
            .find({tuit: tid})
            .populate('dislikedBy', 'username')
            .exec();
    }

    /**
     * Uses DislikeModel to retrieve all tuits disliked by a specified user
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    async findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]> {
        return DislikeModel
            .find(({dislikedBy: uid}))
            .populate('tuit', 'tuit')
            .exec();
    }

    /**
     * Insert dislike instance into the database
     * @param {string} uid Primary key of the user that disliked the tuit
     * @param {string} tid Primary key of the tuit that was disliked
     * @returns Promise To be notified when dislike is inserted into the database
     */
    async userDislikesTuit(uid: string, tid: string): Promise<Dislike> {
        return DislikeModel.create({
            tuit: tid,
            dislikedBy: uid
        });
    }

    /**
     * Removes an existing dislike instance from the database
     * @param {string} uid Primary key of the user that disliked the tuit
     * @param {string} tid Primary key of the tuit that was disliked
     * @returns Promise To be notified when dislike is removed from the database
     */
    async userUndislikesTuit(uid: string, tid: string): Promise<any> {
        return DislikeModel.deleteOne({
            tuit: tid,
            dislikedBy: uid
        });
    }

    /**
     * Uses DislikeModel to retrieve if user disliked a specified tuit
     * @param {string} uid Primary key of the user
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when dislike is retrieved from the database
     */
    async findUserDislikesTuit(uid: string, tid: string): Promise<Dislike> {
        return DislikeModel.findOne({
            tuit: tid,
            dislikedBy: uid
        });
    }

    /**
     * Uses DislikeModel to retrieve how many users disliked a specified tuit
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when count is retrieved from the database
     */
    async countHowManyDislikedTuit(tid: string): Promise<any> {
        return DislikeModel.count({tuit: tid});
    }
};