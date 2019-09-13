const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const authenticate = require("./routes/authenticate");
const register = require("./routes/register");
const upload = require("./routes/upload");
const download = require("./routes/download");
const exams = require("./routes/exams");
const questions = require("./routes/questions");
const generate = require("./routes/generate");

const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

const server = express();

server.use(express.json());
server.use(cookieParser());

const url =
  "mongodb+srv://Lior:1234@sadna-cromm.mongodb.net/test?retryWrites=true";

mongoose.connect(url, { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("mongo connected!");
});

//Routing
server.use(express.static(path.join(__dirname, "/public")));
server.use("/authenticate", authenticate);
server.use("/register", register);
server.post("/upload", upload);
server.use("/download", download);
server.use("/exams", exams);
server.use("/questions", questions);
server.use("/generate", generate);


server.get('/checkToken', withAuth, function (req, res) {
  //res.sendStatus(200)
  res.status(200).json({
    email: req.email
  });
});

server.listen(8000, () => {
  console.log("Server started!");
});
