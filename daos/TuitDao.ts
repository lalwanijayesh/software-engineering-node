/**
 * @file Implements DAO managing data storage of users. Uses mongoose TuitModel
 * to integrate with MongoDB.
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

/**
 * @class TuitDao Implements Data Access Object managing data
 * storage of Tuits.
 * @property {TuitDao} tuitDao private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    /**
     * Creates singleton DAO instance.
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao == null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    };
    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when tuits are retrieved from database
     */
    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find()
            .populate('postedBy', 'username')
            .exec();
    }

    /**
     * Uses TuitModel to retrieve tuits by the specified user
     * @param {string} uid Primary key of the user whose tuits are to be retrieved
     * @returns Promise To be notified when tuits are retrieved from database
     */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return TuitModel
            .find({postedBy: uid})
            .populate('postedBy', 'username')
            .exec();
    }

    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from database
     */
    async findTuitById(tid: string): Promise<any> {
        return TuitModel
            .findById(tid)
            .populate('postedBy', 'username')
            .exec();
    }

    /**
     * Inserts tuit instance into the database
     * @param {string} uid Primary key of the user that posted the tuit
     * @param {Tuit} tuit Tuit instance to be inserted into the database
     */
    async createTuit(uid: string, tuit: Tuit): Promise<Tuit> {
        return TuitModel.create({...tuit, postedBy: uid});
    }

    /**
     * Removes existing tuit from the database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({_id: tid});
    }

    /**
     * Updates existing tuit in the database with new values
     * @param {string} tid Primary key of the tuit to be updated
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne({_id: tid},
            {$set: tuit})
    }

    /**
     * Removes existing tuits by specific user from the database
     * @param {string} uid Primary key of the user that posted the tuits
     * @returns Promise To be notified when tuits are removed from the database
     */
    async deleteTuitsByUser(uid: string): Promise<any> {
        return TuitModel.deleteMany({postedBy: uid});
    }
}