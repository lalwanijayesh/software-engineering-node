/**
 * @file Declares interface for Dislikes related data access object methods.
 */
import Dislike from "../models/Dislike";

export default interface DislikeDao {
    findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]>;
    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;
    userDislikesTuit(uid: string, tid: string): Promise<Dislike>;
    userUndislikesTuit(uid: string, tid: string): Promise<any>;
    findUserDislikesTuit(uid: string, tid: string): Promise<Dislike>;
    countHowManyDislikedTuit(tid: string): Promise<any>;
};