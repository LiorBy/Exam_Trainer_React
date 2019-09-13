const express = require("express");
const User = require("../models/user-model");
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhh';

const router = express.Router();

router.post("/", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          console.log("token: " + token);
          res.cookie('token', token, { httpOnly: true }).status(200).json({
            jwt: token,
            email: email
          });
        }
      });
    }
  });
});

module.exports = router;
