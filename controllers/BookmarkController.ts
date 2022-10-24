import BookmarkControllerI from "../interfaces/BookmarkController";
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController == null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get('/users/:uid/bookmarks', BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.get('/tuits/:tid/bookmarks', BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
            app.get('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.findUserBookmarkedTuit);
        }
        return BookmarkController.bookmarkController;
    }
    private constructor() {}

    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    findAllUsersThatBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    findUserBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findUserBookmarkedTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));
};