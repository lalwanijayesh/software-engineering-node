/**
 * @file Declares Controller for the RESTful Web service API related to authentication.
 */
import AuthControllerI from "../interfaces/AuthController";
import UserDao from "../daos/UserDao";
import {Express, Request, Response} from "express";
import bcrypt from "bcrypt";
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
export default class AuthController implements AuthControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static authController: AuthController | null = null;

    /**
     * Create singleton controller instance
     * @param {Express} app Express instance to declare the RESTful web service API
     * @returns AuthController
     */
    public static getInstance = (app: Express): AuthController => {
        if (AuthController.authController == null) {
            AuthController.authController = new AuthController();
            app.post('/auth/signup', AuthController.authController.signup);
            app.post('/auth/profile', AuthController.authController.profile);
            app.post('/auth/logout', AuthController.authController.logout);
            app.post('/auth/login', AuthController.authController.login);
        }
        return AuthController.authController;
    }
    private constructor() {}

    /**
     * Creates a new user instance and adds user profile to session
     * @param {Request} req Represents request from client, including the
     * body containing the JSON object for the new user to sign up
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing profile of the new user that signed up
     */
    signup = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await AuthController.userDao
            .findUserByUsername(newUser.username);
        if (existingUser) {
            res.sendStatus(403);
        } else {
            const insertedUser = await AuthController.userDao
                .createUser(newUser);
            insertedUser.password = '';
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    /**
     * Retrieves user profile of logged-in user from the current session
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing profile of the user in session
     * otherwise status code 403 Forbidden if not logged in
     */
    profile = (req: Request, res: Response) => {
        const profile = req.session['profile'];
        if (profile) {
            profile.password = '';
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    /**
     * Logs out user by removing profile from the current session
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * status code 200 indicating successful logout
     */
    logout = (req: Request, res: Response) => {
        req.session.destroy((err) => {});
        res.sendStatus(200);
    }

    /**
     * Retrieves existing user by credentials and adds profile to current session
     * @param {Request} req Represents request from client, including the
     * body containing the username and password of the user to log in
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing profile of the user after login
     * otherwise status code 403 Forbidden if no match for user
     */
    login = async (req: Request, res: Response) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = await AuthController.userDao
            .findUserByUsername(username);
        if (!existingUser) {
            res.sendStatus(403);
            return;
        }

        const match = await bcrypt
            .compare(password, existingUser.password);
        if (match) {
            existingUser.password = '******';
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    }
}