import BookmarkControllerI from "../interfaces/BookmarkController";
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";

export default class BookmarkController implements BookmarkControllerI {
    app: Express;
    bookmarkDao: BookmarkDao;
    constructor(app: Express, bookmarkDao: BookmarkDao) {
        this.app = app;
        this.bookmarkDao = bookmarkDao;
        this.app.post('/users/:uid/bookmarks/:tid', this.userBookmarksTuit);
        this.app.delete('/users/:uid/bookmarks/:tid', this.userUnbookmarksTuit);
        this.app.get('/users/:uid/bookmarks', this.findAllTuitsBookmarkedByUser);
        this.app.get('/tuits/:tid/bookmarks', this.findAllUsersThatBookmarkedTuit);
        this.app.get('/users/:uid/bookmarks/:tid', this.findUserBookmarkedTuit);
    }

    userBookmarksTuit = (req: Request, res: Response) =>
        this.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    userUnbookmarksTuit = (req: Request, res: Response) =>
        this.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        this.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    findAllUsersThatBookmarkedTuit = (req: Request, res: Response) =>
        this.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    findUserBookmarkedTuit = (req: Request, res: Response) =>
        this.bookmarkDao.findUserBookmarkedTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));
};