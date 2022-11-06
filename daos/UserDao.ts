/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB.
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * @class UserDao Implements Data Access Object managing data
 * storage of Users.
 * @property {UserDao} userDao private single instance of UserDao
 */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;
    /**
     * Creates singleton DAO instance.
     * @returns UserDao
     */
    public static getInstance = (): UserDao => {
        if (UserDao.userDao == null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    };
    private constructor() {}

    /**
     * Uses UserModel to retrieve all user documents from users collection
     * @returns Promise To be notified when users are retrieved from database
     */
    async findAllUsers(): Promise<User[]> {
        return UserModel.find();
    }

    /**
     * Uses UserModel to retrieve single user document from users collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from database
     */
    async findUserById(uid: string): Promise<any> {
        return UserModel.findById(uid);
    }

    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted in the database
     * @returns Promise To be notified when user is inserted into the database
     */
    async createUser(user: User): Promise<User> {
        return UserModel.create(user);
    }

    /**
     * Removes an existing user from the database
     * @param {string} uid Primary key of the user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    async deleteUser(uid: string): Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }

    /**
     * Updates existing user in the database with new values
     * @param {string} uid Primary key of the user to be updated
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return UserModel.updateOne({_id: uid},
            {$set: user}
        );
    }

    /**
     * Removes all existing users from the database
     * @returns Promise To be notified when users are removed from the database
     */
    async deleteAllUsers(): Promise<any> {
        return UserModel.deleteMany();
    }

    /**
     * Removes all existing users by specified username from the database
     * @param {string} username Username of the users to be removed
     * @returns Promise To be notified when users are removed from the database
     */
    async deleteUsersByUsername(username: string): Promise<any> {
        return UserModel.deleteMany({username: username});
    }
};