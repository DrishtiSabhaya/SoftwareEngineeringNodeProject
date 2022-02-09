import User from "./models/User";

const express = require('express');
const mongoose = require("mongoose");
const app = express();

import TuitController from "./controller/TuitController";
import UserDao from "./daos/UserDao";
import UserController from "./controller/UserController";

const port = process.env.PORT || 4000;

var url = "mongodb+srv://drishti7:drishti@cluster0.s1acl.mongodb.net/tuitsdb?retryWrites=true&w=majority";

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});

app.use(express.json());

const tuitController = TuitController.getInstance(app);
const userDao = new UserDao();
const userController = new UserController(app, userDao);

app.get('/hello', (req:any, res: any) =>
    res.send('Hello World!'));

