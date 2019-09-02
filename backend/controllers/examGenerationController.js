const Question = require("../models/question-model");

exports.generateExam = (req, res) => {
  var query = { ...req.query };
  query.course = req.params.course;
  var options = { limit: 5 };
  Question.findRandom(query, {}, options, (err, questions) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(questions);
    }
  });
};
