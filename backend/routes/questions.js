const express = require("express");
const questionsController = require("./../controllers/questionsController");
const router = express.Router();

router
  .route("/")
  .get(questionsController.getAllQuestions)
  .post(questionsController.insertQuestion);

router
  .route("/question/:id")
  .get(questionsController.getQuestionById)
  .put(questionsController.editQuestionById)
  .delete(questionsController.deleteQuestionById);

router.route("/course/:course").get(questionsController.getQuestionsByCourse);

module.exports = router;
