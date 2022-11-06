"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * @class TuitDao Implements Data Access Object managing data
 * storage of Tuits.
 * @property {TuitDao} tuitDao private single instance of TuitDao
 */
class TuitDao {
    constructor() { }
    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when tuits are retrieved from database
     */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find()
                .populate('postedBy', 'username')
                .exec();
        });
    }
    /**
     * Uses TuitModel to retrieve tuits by the specified user
     * @param {string} uid Primary key of the user whose tuits are to be retrieved
     * @returns Promise To be notified when tuits are retrieved from database
     */
    findTuitsByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default
                .find({ postedBy: uid });
        });
    }
    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from database
     */
    findTuitById(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default
                .findById(tid)
                .populate('postedBy', 'username')
                .exec();
        });
    }
    /**
     * Inserts tuit instance into the database
     * @param {string} uid Primary key of the user that posted the tuit
     * @param {Tuit} tuit Tuit instance to be inserted into the database
     */
    createTuit(uid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid }));
        });
    }
    /**
     * Removes existing tuit from the database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.deleteOne({ _id: tid });
        });
    }
    /**
     * Updates existing tuit in the database with new values
     * @param {string} tid Primary key of the tuit to be updated
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit(tid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
    }
    /**
     * Removes existing tuits by specific user from the database
     * @param {string} uid Primary key of the user that posted the tuits
     * @returns Promise To be notified when tuits are removed from the database
     */
    deleteTuitsByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.deleteMany({ postedBy: uid });
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
 * Creates singleton DAO instance.
 * @returns TuitDao
 */
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao == null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
//# sourceMappingURL=TuitDao.js.map