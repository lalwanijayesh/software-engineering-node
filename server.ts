/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>Users</li>
 *     <li>Tuits</li>
 *     <li>Likes</li>
 *     <li>Follows</li>
 *     <li>Bookmarks</li>
 *     <li>Messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database service.
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
const cors = require('cors');

const session = require('express-session');
require('dotenv').config();

import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import AuthController from "./controllers/AuthController";

const app = express();

let sess = {
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false
    }
}

if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}

app.use(session(sess));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

// Build connection string and connect to database
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = "tuiter";
// mongoose.connect(`${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, options);
mongoose.connect('mongodb://localhost:27017/tuiter', options);

// Inject RESTful controllers for web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const authController = AuthController.getInstance(app);

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Tuiter API!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on remote server if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
