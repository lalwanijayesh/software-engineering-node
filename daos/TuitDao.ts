import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao == null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    };
    private constructor() {}

    async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModels =
            await TuitModel.find()
                .populate('postedBy', 'username');
        return tuitMongooseModels
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())),
                    tuitMongooseModel.postedBy);
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
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())),
                    tuitMongooseModel.postedBy);
            });
    }
    async findTuitById(tid: string): Promise<any> {
        const tuitMongooseModel = await TuitModel
            .findById(tid).populate('postedBy')
            .populate('postedBy', 'username');
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit ?? '',
            new Date(tuitMongooseModel?.postedOn ?? (new Date())),
            tuitMongooseModel.postedBy);
    }
    async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel.tuit,
            new Date(tuitMongooseModel?.postedOn ?? (new Date())),
            tuitMongooseModel.postedBy);
    }
    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({_id: tid});
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne(
            {_id: tid},
            {$set: tuit})
    }
}