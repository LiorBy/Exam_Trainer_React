const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: String,
  course: String,
  year: Number,
  semester: String,
  lecturer: String
});

const Question = mongoose.model("question", QuestionSchema);

module.exports = Question;
