"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../daos/UserDao"));
/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users to retrieve all the user instances</li>
 *     <li>GET /users/:userid to retrieve a particular user instance</li>
 *     <li>POST /users to create a new user instance</li>
 *     <li>DELETE /users/:userid to remove a particular user instance</li>
 *     <li>PUT /users/:userid to modify a particular user instance</li>
 *     <li>DELETE /users to remote all user instances</li>
 *     <li>DELETE /users/username/:username to remove all users with a particular username</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web Service API
 */
class UserController {
    constructor() {
        /**
         * Retrieves all users from the database and returns an array of users
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON rrays containing the user objects
         */
        this.findAllUsers = (req, res) => UserController.userDao.findAllUsers()
            .then(users => res.json(users));
        /**
         * Retrieves specific user by their primary key
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the user that matches the user ID
         */
        this.findUserById = (req, res) => UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
        /**
         * Creates a new user instance
         * @param {Request} req Represents request from client, including the
         * body containing the JSON object for the new user to be inserted in the database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new user that was inserted in the database
         */
        this.createUser = (req, res) => UserController.userDao.createUser(req.body)
            .then(user => res.json(user));
        /**
         * Removes an existing user instance
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be removed
         * @param {Response} res Represents response to client, including status
         * on whether user was successfully removed or not
         */
        this.deleteUser = (req, res) => UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
        /**
         * Modifies an existing user instance
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be modified
         * @param {Response} res Represents response to client, including status
         * on whether user was successfully updated or not
         */
        this.updateUser = (req, res) => UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
        /**
         * Removes all existing user instances
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including status
         * on whether all users were successfully removed or not
         */
        this.deleteAllUsers = (req, res) => UserController.userDao.deleteAllUsers()
            .then(status => res.json(status));
        /**
         * Removes existing user instances with specified username
         * @param {Request} req Represents request from client, including path
         * parameter username identifying the users to be removed
         * @param {Response} res Represents response to client, including status
         * on whether users were successfully removed or not
         */
        this.deleteUsersByUsername = (req, res) => UserController.userDao.deleteUsersByUsername(req.params.username)
            .then(status => res.json(status));
    }
}
exports.default = UserController;
UserController.userDao = UserDao_1.default.getInstance();
UserController.userController = null;
/**
 * Create singleton controller instance
 * @param {Express} app Express instance to declare the RESTful web service API
 * @returns UserController
 */
UserController.getInstance = (app) => {
    if (UserController.userController == null) {
        UserController.userController = new UserController();
        app.get('/users', UserController.userController.findAllUsers);
        app.get('/users/:userid', UserController.userController.findUserById);
        app.post('/users', UserController.userController.createUser);
        app.delete('/users/:userid', UserController.userController.deleteUser);
        app.put('/users/:userid', UserController.userController.updateUser);
        app.delete('/users', UserController.userController.deleteAllUsers);
        app.delete('/users/username/:username', UserController.userController.deleteUsersByUsername);
    }
    return UserController.userController;
};
//# sourceMappingURL=UserController.js.map