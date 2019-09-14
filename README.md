# Exam_Trainer_React

"client-install": "cd client && npm install",
"backend-install": "cd backend && npm install",
"client": "npm start --prefix client",

///////////////////
server.js

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
server.use(express.static(path.join(\_\_dirname, "/public")));
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
server.use(express.static(path.join(\_\_dirname, 'client/build')));

server.get('\*', (req, res) => {
res.sendFile(path.join(\_\_dirname = 'client/build/index.html'));
})
}

let port_number = server.listen(process.env.PORT || 8000);
server.listen(port_number, () => {
console.log("Server started!");
});

//////////////////
{
"name": "reactexpress",
"version": "1.0.0",
"description": "Exam-Trainer-App",
"main": "server.js",
"scripts": {
"client-install": "cd client && npm install",
"backend-install": "cd backend && npm install",
"start": "cd backend && node server.js",
"server": "cd backend && nodemon server.js",
"client": "cd client && npm start",
"dev": "concurrently \"npm run server\" \"npm run client\"",
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
},
"author": "Hamigzar",
"license": "MIT",
"devDependencies": {
"eslint": "^6.1.0",
"eslint-config-airbnb": "^17.1.1",
"eslint-config-prettier": "^6.0.0",
"eslint-plugin-import": "^2.18.2",
"eslint-plugin-jsx-a11y": "^6.2.3",
"eslint-plugin-node": "^9.1.0",
"eslint-plugin-prettier": "^3.1.0",
"eslint-plugin-react": "^7.14.3",
"nodemon": "^1.14.6",
"prettier": "^1.18.2"
},
"dependencies": {
"axios": "^0.19.0",
"bcrypt": "^3.0.6",
"bcryptjs": "^2.4.3",
"concurrently": "^3.5.1",
"cookie-parser": "^1.4.4",
"cors": "^2.8.5",
"express": "^4.16.2",
"formidable": "^1.2.1",
"jsonwebtoken": "^8.5.1",
"mongoose": "^5.6.7",
"mongoose-simple-random": "^0.4.1",
"pdf2json": "^1.1.8",
"react-router-dom": "^5.0.1"
}
}

/////////////////
