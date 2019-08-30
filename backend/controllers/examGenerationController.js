const Question = require("../models/question-model");

exports.generateExam = (req, res) => {
  var query = { ...req.query };
  query.course = req.params.course;
  Question.find(query, (err, questions) => {
    if (err) {
      res.status(500).send(err);
    } else {
      //TODO: Implement generate exam methods
      res.status(200).send(questions);
    }
  });
};
