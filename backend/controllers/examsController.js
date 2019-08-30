const Exam = require("../models/exam-model");

exports.getAllExams = (req, res) => {
  Exam.find({}, (err, exams) => {
    if (err) {
      res.status(500).send(err);
    } else if (!exams) {
      res.status(401).send("No exams found");
    } else {
      res.status(200).json({
        exams: exams
      });
    }
  });
};

exports.getExamById = (req, res) => {
  Exam.findById(req.params.id, (err, exam) => {
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
};

exports.editExamById = (req, res) => {
  const newExam = {};
  newExam.name = req.body.name;
  newExam.course = req.body.course;
  newExam.year = req.body.year;
  newExam.semester = req.body.semester;
  newExam.lecturer = req.body.lecturer;
  newExam.raw_text = req.body.raw_text;
  Exam.findByIdAndUpdate({ _id: req.params.id }, newExam, (err, exam) => {
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
};

exports.deleteExamById = (req, res) => {
  Exam.findByIdAndDelete({ _id: req.params.id }, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Exam deleted");
    }
  });
};

exports.insertExam = (req, res) => {
  const { name, course, year, semester, lecturer, raw_text } = req.body;
  const exam = new Exam({ name, course, year, semester, lecturer, raw_text });
  exam.save(err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
};

exports.getExamsByCourse = (req, res) => {
  var query = { ...req.query };
  query.course = req.params.course;
  Exam.find(query, (err, exams) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(exams);
    }
  });
};
