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
}