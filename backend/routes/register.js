const express = require("express");
const User = require("../models/user-model");

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(err => {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      console.log("the user: " + user.email + "save in the DB!");
      res.status(200).send("Welcome to the club!");
    }
  });
});

module.exports = router;
