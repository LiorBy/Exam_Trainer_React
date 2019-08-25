const express = require("express");
const examsController = require("./../controllers/examsController");
const Exam = require("../models/exam-model");
const router = express.Router();

router
  .route("/")
  .get(examsController.getAllExams)
  .post(examsController.insertExam);

router
  .route("/:id")
  .get(examsController.getExamById)
  .put(examsController.editExamById)
  .delete(examsController.deleteExamById);

module.exports = router;
