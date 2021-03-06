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
const courses = require("./routes/courses");

const server = express();

server.use(express.json());

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
server.use("/courses", courses);

//production mode
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, '../client/build')));

  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname = '../client/build/index.html'));
  })
}

let port_number = server.listen(process.env.PORT || 8000);
server.listen(port_number, () => {
  console.log("Server started!");
});