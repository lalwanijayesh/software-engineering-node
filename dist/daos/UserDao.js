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
const UserModel_1 = __importDefault(require("../mongoose/UserModel"));
/**
 * @class UserDao Implements Data Access Object managing data
 * storage of Users.
 * @property {UserDao} userDao private single instance of UserDao
 */
class UserDao {
    constructor() { }
    /**
     * Uses UserModel to retrieve all user documents from users collection
     * @returns Promise To be notified when users are retrieved from database
     */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.find();
        });
    }
    /**
     * Uses UserModel to retrieve single user document from users collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from database
     */
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.findById(uid);
        });
    }
    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted in the database
     * @returns Promise To be notified when user is inserted into the database
     */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.create(user);
        });
    }
    /**
     * Removes an existing user from the database
     * @param {string} uid Primary key of the user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    /**
     * Updates existing user in the database with new values
     * @param {string} uid Primary key of the user to be updated
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
    }
    /**
     * Removes all existing users from the database
     * @returns Promise To be notified when users are removed from the database
     */
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.deleteMany();
        });
    }
    /**
     * Removes all existing users by specified username from the database
     * @param {string} username Username of the users to be removed
     * @returns Promise To be notified when users are removed from the database
     */
    deleteUsersByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.deleteMany({ username: username });
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.findOne({ username: username });
        });
    }
}
exports.default = UserDao;
UserDao.userDao = null;
/**
 * Creates singleton DAO instance.
 * @returns UserDao
 */
UserDao.getInstance = () => {
    if (UserDao.userDao == null) {
        UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
};
;
//# sourceMappingURL=UserDao.js.map