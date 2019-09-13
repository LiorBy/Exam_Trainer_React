const express = require("express");
const User = require("../models/user-model");

const router = express.Router();

router.post("/", function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      res.status(500).json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password"
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (!same) {
          res.status(401).json({
            error: "Incorrect email or password"
          });
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
