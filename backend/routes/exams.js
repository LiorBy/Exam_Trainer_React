const express = require("express");
const examsController = require("./../controllers/examsController");
const router = express.Router();

router
  .route("/")
  .get(examsController.getAllExams)
  .post(examsController.insertExam);

router
  .route("/exam/:id")
  .get(examsController.getExamById)
  .put(examsController.editExamById)
  .delete(examsController.deleteExamById);

router.route("/course/:course").get(examsController.getExamsByCourse);

module.exports = router;
