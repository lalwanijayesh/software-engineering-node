/**
 * @file Declares interface for RESTful web services related to bookmarks.
 */
import {Request, Response} from "express";

export default interface BookmarkController {
    userBookmarksTuit(req: Request, res: Response): void;
    userUnbookmarksTuit(req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;
    findAllUsersThatBookmarkedTuit(req: Request, res: Response): void;
    findUserBookmarkedTuit(req: Request, res: Response): void;
};