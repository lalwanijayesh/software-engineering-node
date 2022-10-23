import LikeDaoI from "../interfaces/LIkeDao";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

export default class LikeDao implements LikeDaoI {
    async findAllUsersThatLikedTuit(tid: String): Promise<Like[]> {
        return LikeModel
            .find({tuit: tid})
            .populate('likedBy')
            .exec();
    }
    async findAllTuitsLikedByUser(uid: String): Promise<Like[]> {
        return LikeModel
            .find(({likedBy: uid}))
            .populate('tuit')
            .exec();
    }
    async userLikesTuit(uid: string, tid: String): Promise<Like> {
        return LikeModel.create({
            tuit: tid,
            likedBy: uid
        });
    }
    async userUnlikesTuit(uid: string, tid: String): Promise<any> {
        return LikeModel.deleteOne({
            tuit: tid,
            likedBy: uid
        });
    }
};