const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const authenticate = require("./routes/authenticate");
const register = require("./routes/register");

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

server.listen(8000, () => {
  console.log("Server started!");
});
