const Question = require("../models/question-model");

exports.getAllCourses = (req, res) => {
  Question.distinct("course", (err, courses) => {
    if (err) {
      res.status(500).send(err);
    } else if (!courses) {
      res.status(401).send("No courses found");
    } else {
      res.status(200).json({
        courses: courses
      });
    }
  });
};
