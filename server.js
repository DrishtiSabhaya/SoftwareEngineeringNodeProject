const express = require('express');
const mongoose = require("mongoose");
const app = express();

// import TuitController from "./controller/TuitController";
const tuit = require('/controller/TuitController');

const port = 4000;
const dbname = "tuitdb";
const username = "drishti";
const password = "1234";
var uri = "tuitdb";
var url = "mongodb://localhost:27017/tuitdb";

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});

app.use(express.json());

const tuitController = tuit.getInstance(app);

app.get('/hello', (req, res) =>
  res.send('Hello World!'));

app.listen(PORT);
