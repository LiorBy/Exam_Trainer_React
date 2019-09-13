const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const upload = require('./upload');
const download = require('./download');
const withAuth = require('./middleware');
const authenticate = require('./authenticate');
const userRegister = require('./userRegister');
const User = require('./models/user-model');
const path = require('path');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const server = express();

//const secret = 'mysecretsshhh';

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(cookieParser());


const url = "mongodb+srv://Lior:1234@sadna-cromm.mongodb.net/test?retryWrites=true";

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) throw err;
  console.log('mongo connected!')
});


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}




server.use(express.static(__dirname + "/public"));


server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


server.use(cors(corsOptions));

//Routing
server.post('/upload', upload);
server.use('/download', download);
server.use('/api/userRegister', userRegister);
server.use('/authenticate', authenticate);

////


server.get('/secret', withAuth, function (req, res) {
  res.send('The password is potato');
});

server.get('/checkToken', withAuth, function (req, res) {
  res.sendStatus(200);
});


server.listen(8000, () => {
  console.log('Server started!')
})