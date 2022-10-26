"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkDao_1 = __importDefault(require("../daos/BookmarkDao"));
/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/bookmarks/:tid to create a new bookmark instance</li>
 *     <li>DELETE /users/:uid/bookmarks/:tid to remove a particular bookmark instance</li>
 *     <li>GET /users/:uid/bookmarks to retrieve all tuits bookmarked by a particular user</li>
 *     <li>GET /tuits/:tid/bookmarks to retrieve all users that bookmarked a particular tuit</li>
 *     <li>GET /users/:uid/bookmarks/:tid to check whether particular user bookmarks given tuit</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web Service API
 */
class BookmarkController {
    constructor() {
        /**
         * Creates a new bookmark instance
         * @param {Request} req Represents request from client, including path
         * parameters uid and tid, identifying user and the bookmarked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new bookmark object that was inserted in
         * the database
         */
        this.userBookmarksTuit = (req, res) => BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));
        /**
         * Removes an existing bookmark instance
         * @param {Request} req Represents request from client, including path
         * parameters uid and tid, identifying user and the bookmarked tuit
         * @param {Response} res Represents response to client, including status
         * on whether the bookmark instance was successfully removed or not
         */
        this.userUnbookmarksTuit = (req, res) => BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));
        /**
         * Retrieve all tuits bookmarked by a particular user
         * @param {Request} req Represents request from client, including path
         * parameter uid, indetifying the primary of the bookmarking user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of tuit objects bookmarked by specified user
         */
        this.findAllTuitsBookmarkedByUser = (req, res) => BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));
        /**
         * Retrieves all users that bookmarked a particular tuit
         * @param {Request} req Represents request from client, including path
         * parameter tid, identifying the primary key of the bookmarked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of user objects that bookmarked the specified tuit
         */
        this.findAllUsersThatBookmarkedTuit = (req, res) => BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.json(bookmarks));
        /**
         * Checks whether a particular user bookmarks the specified tuit
         * @param {Request} req Represents request from client, including path
         * parameters uid and tid, identifying user and the bookmarked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the bookmark object with the particular
         * user and tuit
         */
        this.findUserBookmarkedTuit = (req, res) => BookmarkController.bookmarkDao.findUserBookmarkedTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));
    }
}
exports.default = BookmarkController;
BookmarkController.bookmarkDao = BookmarkDao_1.default.getInstance();
BookmarkController.bookmarkController = null;
/**
 * Create singleton controller instance
 * @param {Express} app Express instance to declare the RESTful web service API
 * @returns BookmarkController
 */
BookmarkController.getInstance = (app) => {
    if (BookmarkController.bookmarkController == null) {
        BookmarkController.bookmarkController = new BookmarkController();
        app.post('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userBookmarksTuit);
        app.delete('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.userUnbookmarksTuit);
        app.get('/users/:uid/bookmarks', BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
        app.get('/tuits/:tid/bookmarks', BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
        app.get('/users/:uid/bookmarks/:tid', BookmarkController.bookmarkController.findUserBookmarkedTuit);
    }
    return BookmarkController.bookmarkController;
};
;
//# sourceMappingURL=BookmarkController.js.map