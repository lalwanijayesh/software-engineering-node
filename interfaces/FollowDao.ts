import Follow from "../models/Follow";

export default interface FollowDao {
    userFollowsAnotherUser(uid: String, fuid: String): Promise<Follow>;
    userUnfollowsAnotherUser(uid: String, fuid: String): Promise<any>;
    findAllUsersFollowedByUser(uid: String): Promise<Follow[]>;
    findAllUsersThatFollowUser(uid: String): Promise<Follow[]>;
    viewUserFollowsAnotherUser(uid: String, fuid: String): Promise<Follow>;
};