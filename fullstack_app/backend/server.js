const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const upload = require('./upload');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(express.static(__dirname + "/public"));

server.use(cors(corsOptions));

server.post('/upload', upload);

server.listen(8000, () => {
  console.log('Server started!')
})