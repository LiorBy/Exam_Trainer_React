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

//get exam by id
router.get("/:id", (req, res) => {
  Exam.findById(req.params.id, function(err, exam) {
    if (err) {
      res.status(500).send("Error");
    } else if (!exam) {
      res.status(401).send("Exam not found");
    } else {
      res.status(200).json({
        exam: exam
      });
    }
  });
});

//edit exam by id
router.put("/:id", (req, res) => {
  const { name, course, year, semester, lecturer, raw_text } = req.body;
  const newExam = {};
  newExam.name = req.body.name;
  newExam.course = req.body.course;
  newExam.year = req.body.year;
  newExam.semester = req.body.semester;
  newExam.lecturer = req.body.lecturer;
  newExam.raw_text = req.body.raw_text;

  Exam.findByIdAndUpdate({ _id: req.params.id }, newExam, function(err, exam) {
    if (err) {
      res.status(500).send(err);
    } else if (!exam) {
      res.status(401).send("Exam not found");
    } else {
      res.status(200).json({
        exam: exam
      });
    }
  });
});

//delete exam by id
router.delete("/:id", (req, res) => {
  Exam.findByIdAndDelete({ _id: req.params.id }, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Exam deleted");
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
