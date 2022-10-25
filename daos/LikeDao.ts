/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB.
 */
import LikeDaoI from "../interfaces/LIkeDao";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

/**
 * @class LikeDao Implements Data Access Object managing data
 * storage of Likes.
 * @property {LikeDao} likeDao private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    /**
     * Creates singleton DAO instance.
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao == null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    };
    private constructor() {}

    /**
     * Uses LikeModel to retrieve all users that liked a specified tuit
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when users are retrieved from the database
     */
    async findAllUsersThatLikedTuit(tid: string): Promise<Like[]> {
        return LikeModel
            .find({tuit: tid})
            .populate('likedBy', 'username')
            .exec();
    }

    /**
     * Uses LikeModel to retrieve all tuits liked by a specified user
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    async findAllTuitsLikedByUser(uid: string): Promise<Like[]> {
        return LikeModel
            .find(({likedBy: uid}))
            .populate('tuit', 'tuit')
            .exec();
    }

    /**
     * Insert like instance into the database
     * @param {string} uid Primary key of the user that liked the tuit
     * @param {string} tid Primary key of the tuit that was liked
     * @returns Promise To be notified when like is inserted into the database
     */
    async userLikesTuit(uid: string, tid: string): Promise<Like> {
        return LikeModel.create({
            tuit: tid,
            likedBy: uid
        });
    }

    /**
     * Removes an existing like instance from the database
     * @param {string} uid Primary key of the user that liked the tuit
     * @param {string} tid Primary key of the tuit that was liked
     * @returns Promise To be notified when like is removed from the database
     */
    async userUnlikesTuit(uid: string, tid: string): Promise<any> {
        return LikeModel.deleteOne({
            tuit: tid,
            likedBy: uid
        });
    }
};