import Like from "../models/Like";

export default interface LikeDao {
    findAllUsersThatLikedTuit(tid: String): Promise<Like[]>;
    findAllTuitsLikedByUser(uid: String): Promise<Like[]>;
    userLikesTuit(uid: string, tid: String): Promise<Like>;
    userUnlikesTuit(uid: string, tid: String): Promise<any>;
};