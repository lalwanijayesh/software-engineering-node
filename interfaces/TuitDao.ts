/**
 * @file Declares interface for Tuits related data access object methods.
 */
import Tuit from "../models/Tuit";
import Stats from "../models/Stats";

export default interface TuitDao {
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(uid: string): Promise<Tuit[]>;
    findTuitById(tid: string): Promise<Tuit>;
    createTuit(uid: string, tuit: Tuit): Promise<Tuit>;
    deleteTuit(tid: string): Promise<any>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuitsByUser(uid: string): Promise<any>;
    updateStats(tid: string, newStats: Stats): Promise<any>;
};