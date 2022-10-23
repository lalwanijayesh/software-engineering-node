import {Request, Response} from "express";

export default interface BookmarkController {
    userBookmarksTuit(req: Request, res: Response): void;
    userUnbookmarksTuit(req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;
    findAllUsersThatBookmarkedTuit(req: Request, res: Response): void;
    viewUserBookmarkedTuit(req: Request, res: Response): void;
};