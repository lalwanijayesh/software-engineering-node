/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB.
 */
import FollowDaoI from "../interfaces/FollowDao";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data
 * storage of Follows.
 * @property {FollowDao} followDao private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance.
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao == null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    };
    private constructor() {}

    /**
     * Inserts a Follow instance into the database
     * @param {string} uid Primary key of the user that is following
     * @param {string} fuid Primary key of the user that is being followed
     * @returns Promise To be notified when follow is inserted into the database
     */
    async userFollowsAnotherUser(uid: string, fuid: string): Promise<Follow> {
        return FollowModel
            .create({
                userFollowed: fuid,
                userFollowing: uid
            });
    }

    /**
     * Removes an existing Follow instance from the database
     * @param {string} uid Primary key of the user that is following
     * @param {string} fuid Primary key of the user that is being followed
     * @returns Promise To be notified when follow is removed from the database
     */
    async userUnfollowsAnotherUser(uid: string, fuid: string): Promise<any> {
        return FollowModel
            .deleteOne({
                userFollowed: fuid,
                userFollowing: uid
            });
    }

    /**
     * Uses FollowModel to retrieve users that follow a specified user
     * @param {string} uid Primary key of the user that is followed
     * @returns Promise To be notified when follows are retrieved from the database
     */
    async findAllUsersThatFollowUser(uid: string): Promise<Follow[]> {
        return FollowModel
            .find({userFollowed: uid})
            .populate('userFollowing', 'username')
            .exec();
    }

    /**
     * Uses Follow Model to retrieve users that are followed by a specified user
     * @param {string} uid Primary key of the user that is following
     * @returns Promise To be notified when follows are retrieved from the database
     */
    async findAllUsersFollowedByUser(uid: string): Promise<Follow[]> {
        return FollowModel
            .find({userFollowing: uid})
            .populate('userFollowed', 'username')
            .exec();
    }

    /**
     * Uses FollowModel to check if specified user is following another user
     * @param {string} uid Primary key of the user that is following
     * @param {string} fuid Primary key of the user that is being followed
     * @returns Promise To be notified when follow is retrieved from the database
     */
    async findUserFollowsAnotherUser(uid: string, fuid: string): Promise<Follow> {
        return FollowModel
            .findOne({
                userFollowed: fuid,
                userFollowing: uid
            })
            .populate('userFollowed', 'username')
            .populate('userFollowing', 'username')
            .exec();
    }
};