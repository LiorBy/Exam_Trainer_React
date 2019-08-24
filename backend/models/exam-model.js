const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  name: String,
  course: String,
  year: Number,
  semester: String,
  lecturer: String,
  raw_text: String
});

const Exam = mongoose.model("exam", ExamSchema);

module.exports = Exam;
