/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 */

import TuitController from "./controller/TuitController";
import UserController from "./controller/UserController";
import LikeController from "./controller/LikeController";
import FollowController from "./controller/FollowController";
import BookmarkController from "./controller/BookmarkController";
import MessageController from "./controller/MessageController";
import CourseController from "./controller/CourseController";
var cors = require('cors')

/** Connects to a remote MongoDB instance hosted on the Atlas cloud database
* service
*/
const express = require('express');
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());

// port
const port = process.env.PORT || 4000;

// build the connection string
var url = "mongodb+srv://drishti7:drishti@cluster0.s1acl.mongodb.net/tuitsdb?retryWrites=true&w=majority";

// connect to the database
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});

/**
 * Start a server listening at port 4000 or PORT on Heroku.
 */
app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});

app.use(express.json());

// create RESTful Web service API
const tuitController = TuitController.getInstance(app);
const userController = UserController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const courseController = new CourseController(app);

app.get('/hello', (req:any, res: any) =>
    res.send('Hello World!'));

app.get('/', (req:any, res: any) =>
    res.send('Welcome!'));
//
// const PORT = 2000;
// app.listen(process.env.PORT || PORT);