const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  content: String,
  course: String,
  year: Number,
  semester: String,
  lecturer: String,
  subject: String
});

const Question = mongoose.model("question", QuestionSchema);

module.exports = Question;
