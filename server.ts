/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import CourseController from "./controller/CourseController";
import UserController from "./controller/UserController";
import TuitController from "./controller/TuitController";
import LikeController from "./controller/LikeController";
import SessionController from "./controller/SessionController";
import AuthenticationController from "./controller/AuthenticationController";
import mongoose from "mongoose";
import GroupController from "./controller/GroupController";
import DislikeController from "./controller/DislikeController";
const cors = require("cors");
const session = require("express-session");

// build the connection string
var url = "mongodb+srv://drishti7:drishti@cluster0.s1acl.mongodb.net/tuitsdb?retryWrites=true&w=majority";

// connect to the database
mongoose.connect(url);

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: '*'
}));

const SECRET = 'process.env.SECRET';
let sess = {
    secret: SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false
    }
}

if (process.env.ENVIRONMENT === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

// create RESTful Web service API
const courseController = new CourseController(app);
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const dislikesController = DislikeController.getInstance(app);
SessionController(app);
AuthenticationController(app);
GroupController(app);

app.get('/hello', (req:any, res: any) =>
    res.send('Hello World!'));

app.get('/', (req:any, res: any) =>
    res.send('Welcome!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT, function() {
    console.log("Server is running on Port: " + PORT);
});