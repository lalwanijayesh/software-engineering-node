/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";

import UserDao from "./daos/UserDao";
import UserController from "./controllers/UserController";
import TuitDao from "./daos/TuitDao";
import TuitController from "./controllers/TuitController";
import LikeDao from "./daos/LikeDao";
import LikeController from "./controllers/LikeController";
import FollowDao from "./daos/FollowDao";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import BookmarkDao from "./daos/BookmarkDao";
import MessageDao from "./daos/MessageDao";

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

mongoose.connect('mongodb://localhost:27017/tuiter', options);

const userDao = new UserDao();
const userController = new UserController(app, userDao);
const tuitDao = new TuitDao();
const tuitController = new TuitController(app, tuitDao);
const likeDao = new LikeDao();
const likeController = new LikeController(app, likeDao);
const followDao = new FollowDao();
const followController = new FollowController(app, followDao);
const bookmarkDao = new BookmarkDao();
const bookmarkController = new BookmarkController(app, bookmarkDao);
const messageDao = new MessageDao();
const messageController = new MessageController(app, messageDao);

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Tuiter API!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
