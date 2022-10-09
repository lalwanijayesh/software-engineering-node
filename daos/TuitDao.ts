import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModels =
            await TuitModel.find();
        return tuitMongooseModels
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())));
            });
    }
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        const tuitMongooseModels = await TuitModel
            .find({postedBy: uid});
        return tuitMongooseModels
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())));
            });
    }
    async findTuitById(tid: string): Promise<any> {
        const tuitMongooseModel = await TuitModel
            .findById(tid).populate('postedBy').exec();
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit ?? '',
            new Date(tuitMongooseModel?.postedOn ?? (new Date())));
    }
    async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel.tuit,
            new Date(tuitMongooseModel?.postedOn ?? (new Date()))
        )
    }
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne(
            {_id: tid},
            {$set: {tuit: tuit.post}})
    }
}