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
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
/**
 * @class AuthController Implements RESTful Web service API for authentication.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /auth/signup to create a new user and create user session</li>
 *     <li>POST /auth/profile to retrieve profile from current user session</li>
 *     <li>POST /auth/logout to end the current user session</li>
 *     <li>POST /auth/login to retrieve existing user and create user session</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {AuthController} authController Singleton controller implementing
 * RESTful Web Service API
 */
class AuthController {
    constructor() {
        /**
         * Creates a new user instance and adds user profile to session
         * @param {Request} req Represents request from client, including the
         * body containing the JSON object for the new user to sign up
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing profile of the new user that signed up
         */
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            const password = newUser.password;
            const hash = yield bcrypt_1.default.hash(password, saltRounds);
            newUser.password = hash;
            const existingUser = yield AuthController.userDao
                .findUserByUsername(newUser.username);
            if (existingUser) {
                res.sendStatus(403);
            }
            else {
                const insertedUser = yield AuthController.userDao
                    .createUser(newUser);
                insertedUser.password = '';
                req.session['profile'] = insertedUser;
                res.json(insertedUser);
            }
        });
        /**
         * Retrieves user profile of logged-in user from the current session
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing profile of the user in session
         * otherwise status code 403 Forbidden if not logged in
         */
        this.profile = (req, res) => {
            const profile = req.session['profile'];
            if (profile) {
                profile.password = '';
                res.json(profile);
            }
            else {
                res.sendStatus(403);
            }
        };
        /**
         * Logs out user by removing profile from the current session
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * status code 200 indicating successful logout
         */
        this.logout = (req, res) => {
            req.session.destroy((err) => { });
            res.sendStatus(200);
        };
        /**
         * Retrieves existing user by credentials and adds profile to current session
         * @param {Request} req Represents request from client, including the
         * body containing the username and password of the user to log in
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing profile of the user after login
         * otherwise status code 403 Forbidden if no match for user
         */
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const username = user.username;
            const password = user.password;
            const existingUser = yield AuthController.userDao
                .findUserByUsername(username);
            if (!existingUser) {
                res.sendStatus(403);
                return;
            }
            const match = yield bcrypt_1.default
                .compare(password, existingUser.password);
            if (match) {
                existingUser.password = '******';
                req.session['profile'] = existingUser;
                res.json(existingUser);
            }
            else {
                res.sendStatus(403);
            }
        });
    }
}
exports.default = AuthController;
AuthController.userDao = UserDao_1.default.getInstance();
AuthController.authController = null;
/**
 * Create singleton controller instance
 * @param {Express} app Express instance to declare the RESTful web service API
 * @returns AuthController
 */
AuthController.getInstance = (app) => {
    if (AuthController.authController == null) {
        AuthController.authController = new AuthController();
        app.post('/auth/signup', AuthController.authController.signup);
        app.post('/auth/profile', AuthController.authController.profile);
        app.post('/auth/logout', AuthController.authController.logout);
        app.post('/auth/login', AuthController.authController.login);
    }
    return AuthController.authController;
};
//# sourceMappingURL=AuthController.js.map