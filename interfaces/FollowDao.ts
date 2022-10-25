/**
 * @file Declares interface for Follows related data access object methods.
 */
import Follow from "../models/Follow";

export default interface FollowDao {
    userFollowsAnotherUser(uid: string, fuid: string): Promise<Follow>;
    userUnfollowsAnotherUser(uid: string, fuid: string): Promise<any>;
    findAllUsersFollowedByUser(uid: string): Promise<Follow[]>;
    findAllUsersThatFollowUser(uid: string): Promise<Follow[]>;
    findUserFollowsAnotherUser(uid: string, fuid: string): Promise<Follow>;
};