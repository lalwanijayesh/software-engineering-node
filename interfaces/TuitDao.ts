import Tuit from "../models/Tuit";

export default interface TuitDao {
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(uid: string): Promise<Tuit[]>;
    findTuitById(tid: string): Promise<any>;
    createTuit(tuit: Tuit): Promise<Tuit>;
    deleteTuit(tid: string): Promise<any>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
}