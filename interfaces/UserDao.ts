/**
 * @file Declares interface for users related data access object methods.
 */
import User from "../models/User";

export default interface UserDao {
    findAllUsers(): Promise<User[]>;
    findUserById(uid: string): Promise<User>;
    createUser(user: User): Promise<User>;
    deleteUser(uid: string): Promise<any>;
    updateUser(uid: string, user: User): Promise<any>;
    deleteAllUsers(): Promise<any>;
    deleteUsersByUsername(username: string): Promise<any>;
};