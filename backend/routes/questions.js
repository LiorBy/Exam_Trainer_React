const express = require("express");
const Question = require("../models/question-model");
const router = express.Router();

//get all questions
router.get("/", (req, res) => {
  Question.find({}, function(err, questions) {
    if (err) {
      res.status(500).send("ERROR");
    } else if (!questions) {
      res.status(401).send("NO QUESTIONS FOUND");
    } else {
      res.status(200).json({
        questions: questions
      });
    }
  });
});

//get question by id
router.get("/:id", (req, res) => {
  Question.findById(req.params.id, function(err, question) {
    if (err) {
      res.status(500).send("Error");
    } else if (!question) {
      res.status(401).send("question not found");
    } else {
      res.status(200).json({
        question: question
      });
    }
  });
});

//edit question by id
router.put("/:id", (req, res) => {
  const newQuestion = {};
  newQuestion.text = req.body.text;
  newQuestion.course = req.body.course;
  newQuestion.year = req.body.year;
  newQuestion.semester = req.body.semester;
  newQuestion.lecturer = req.body.lecturer;

  Question.findByIdAndUpdate({ _id: req.params.id }, newQuestion, function(
    err,
    question
  ) {
    if (err) {
      res.status(500).send(err);
    } else if (!question) {
      res.status(401).send("question not found");
    } else {
      res.status(200).json({
        question: question
      });
    }
  });
});

//delete question by id
router.delete("/:id", (req, res) => {
  Question.findByIdAndDelete({ _id: req.params.id }, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("question deleted");
    }
  });
});

//insert new question
router.post("/", (req, res) => {
  const { text, course, year, semester, lecturer } = req.body;
  const question = new Question({
    text,
    course,
    year,
    semester,
    lecturer
  });
  question.save(err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
});

module.exports = router;
