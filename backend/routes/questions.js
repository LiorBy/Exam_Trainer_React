const express = require("express");
const Question = require("../models/question-model");
const router = express.Router();

//TODO:
//1. Change routings - by courses and than all the rest
//2. Implement handling generic query
//3. functions to controller and good routing here
//4. add subject field

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
router.get("/id/:id", (req, res) => {
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

//get all lecturers
router.get("/lecturers", (req, res) => {
  Question.find({}, "lecturer", function(err, lecturers) {
    if (err) {
      res.status(500).send(err);
    } else if (!lecturers) {
      res.status(401).send("lecturers not found");
    } else {
      res.status(200).json({
        lecturers: lecturers
      });
    }
  });
});

//get all years
router.get("/year", (req, res) => {
  Question.find({}, "year", function(err, years) {
    if (err) {
      res.status(500).send(err);
    } else if (!years) {
      res.status(401).send("years not found");
    } else {
      res.status(200).json({
        years: years
      });
    }
  });
});

//get all lecturers
router.get("/lecturers", (req, res) => {
  Question.find({}, "lecturer", function(err, lecturers) {
    if (err) {
      res.status(500).send(err);
    } else if (!lecturers) {
      res.status(401).send("lecturers not found");
    } else {
      res.status(200).json({
        lecturers: lecturers
      });
    }
  });
});

//edit question by id
router.put("/id/:id", (req, res) => {
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
