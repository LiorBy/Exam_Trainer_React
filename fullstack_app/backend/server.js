const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const upload = require('./upload');
const download = require('./download');
const mongoose = require('mongoose');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));

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

server.use(cors(corsOptions));

//Routing
server.post('/upload', upload);
server.use('/download', download);



server.listen(8000, () => {
  console.log('Server started!')
})