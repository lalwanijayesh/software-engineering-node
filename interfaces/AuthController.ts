import {Request, Response} from "express";

export default interface AuthController {
    signup(req: Request, res: Response): void;
};