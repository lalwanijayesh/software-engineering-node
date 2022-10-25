/**
 * @file Declares interface for Likes related data access object methods.
 */
import Like from "../models/Like";

export default interface LikeDao {
    findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
    findAllTuitsLikedByUser(uid: string): Promise<Like[]>;
    userLikesTuit(uid: string, tid: string): Promise<Like>;
    userUnlikesTuit(uid: string, tid: string): Promise<any>;
};