/**
 * @file Declares interface for RESTful web services related to authentication.
 */
import {Request, Response} from "express";

export default interface AuthController {
    signup(req: Request, res: Response): void;
    profile(req: Request, res: Response): void;
    logout(req: Request, res: Response): void;
    login(req: Request, res: Response): void;
};