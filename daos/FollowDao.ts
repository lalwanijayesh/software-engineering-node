import FollowDaoI from "../interfaces/FollowDao";
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao == null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    };
    private constructor() {}

    async userFollowsAnotherUser(uid: String, fuid: String): Promise<Follow> {
        return FollowModel
            .create({
                userFollowed: fuid,
                userFollowing: uid
            });
    }
    async userUnfollowsAnotherUser(uid: String, fuid: String): Promise<any> {
        return FollowModel
            .deleteOne({
                userFollowed: fuid,
                userFollowing: uid
            });
    }

    async findAllUsersThatFollowUser(uid: String): Promise<Follow[]> {
        return FollowModel
            .find({userFollowed: uid})
            .populate('userFollowing', 'username')
            .exec();
    }
    async findAllUsersFollowedByUser(uid: String): Promise<Follow[]> {
        return FollowModel
            .find({userFollowing: uid})
            .populate('userFollowed', 'username')
            .exec();
    }
    async findUserFollowsAnotherUser(uid: String, fuid: String): Promise<Follow> {
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