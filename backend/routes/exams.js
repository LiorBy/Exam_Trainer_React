const express = require("express");
const Exam = require("../models/exam-model");
const router = express.Router();

//get all exams
router.get("/", (req, res) => {
  Exam.find({}, function(err, exams) {
    if (err) {
      res.status(500).send("ERROR");
    } else if (!exams) {
      res.status(401).send("NO EXAMS FOUND");
    } else {
      res.status(200).json({
        exams: exams
      });
    }
  });
});

//insert new exam
router.post("/", (req, res) => {
  const { name, course, year, semester, lecturer, raw_text } = req.body;
  const exam = new Exam({ name, course, year, semester, lecturer, raw_text });
  exam.save(err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
});

module.exports = router;
