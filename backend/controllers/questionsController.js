const Question = require("../models/question-model");

exports.getAllQuestions = (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) {
      res.status(500).send(err);
    } else if (!questions) {
      res.status(401).send("No questions found");
    } else {
      res.status(200).json({
        questions: questions
      });
    }
  });
};

exports.getQuestionById = (req, res) => {
  Question.findById(req.params.id, (err, question) => {
    if (err) {
      res.status(500).send(err);
    } else if (!question) {
      res.status(401).send("Question not found");
    } else {
      res.status(200).json({
        question: question
      });
    }
  });
};

exports.editQuestionById = (req, res) => {
  const newQuestion = {};
  newQuestion.content = req.body.content;
  newQuestion.course = req.body.course;
  newQuestion.year = req.body.year;
  newQuestion.semester = req.body.semester;
  newQuestion.lecturer = req.body.lecturer;
  newQuestion.subject = req.body.subject;

  Question.findByIdAndUpdate(
    { _id: req.params.id },
    newQuestion,
    (err, question) => {
      if (err) {
        res.status(500).send(err);
      } else if (!question) {
        res.status(401).send("Question not found");
      } else {
        res.status(200).json({
          question: question
        });
      }
    }
  );
};

exports.deleteQuestionById = (req, res) => {
  Question.findByIdAndDelete({ _id: req.params.id }, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Question deleted");
    }
  });
};

exports.insertQuestion = (req, res) => {
  const { content, course, year, semester, lecturer, subject } = req.body;
  const question = new Question({
    content,
    course,
    year,
    semester,
    lecturer,
    subject
  });
  question.save(err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
};

exports.getQuestionsByCourse = (req, res) => {
  var query = { ...req.query };
  query.course = req.params.course;
  Question.find(query, (err, questions) => {
    if (err) {
      res.status(500).send(err);
    } else if (!questions) {
      res.status(401).send("No questions found");
    } else {
      res.status(200).send(questions);
    }
  });
};
