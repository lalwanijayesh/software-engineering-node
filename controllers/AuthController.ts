import AuthControllerI from "../interfaces/AuthController";
import UserDao from "../daos/UserDao";
import {Express, Request, Response} from "express";
import bcrypt from "bcrypt";
const saltRounds = 10;

export default class AuthController implements AuthControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static authController: AuthController | null = null;

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

    profile = (req: Request, res: Response) => {
        const profile = req.session['profile'];
        if (profile) {
            profile.password = '';
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    logout = (req: Request, res: Response) => {
        req.session.destroy((err) => {});
        res.sendStatus(200);
    }

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