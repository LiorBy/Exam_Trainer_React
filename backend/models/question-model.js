const mongoose = require("mongoose");
const random = require("mongoose-simple-random");

const QuestionSchema = new mongoose.Schema({
  content: String,
  course: String,
  year: Number,
  semester: String,
  lecturer: String,
  subject: String
});

QuestionSchema.plugin(random);

const Question = mongoose.model("question", QuestionSchema);
module.exports = Question;
