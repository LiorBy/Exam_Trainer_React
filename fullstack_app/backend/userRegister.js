const express = require('express');
const userRegister = express.Router();
const User = require('./models/user-model');



userRegister.post('/', (req, res) => {
    const { email, password } = req.body;
    User = new User({ email, password });
    User.save(function(err) {
      if (err) {
        console.log(err);
        res.status(500).send("Error registering new user please try again.");
      } else {
          console.log('the user: ' + User.email + 'save in the DB!');
        res.status(200).send("Welcome to the club!");
      }
    });
  });


  module.exports = userRegister;