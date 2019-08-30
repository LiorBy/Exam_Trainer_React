const express = require("express");
const examGenerationController = require("./../controllers/examGenerationController");
const router = express.Router();

router.route("/course/:course").get(examGenerationController.generateExam);

module.exports = router;
