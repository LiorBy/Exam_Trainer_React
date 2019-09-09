const express = require("express");

const router = express.Router();
const Pdf2text = require("../models/parsePDF-model");

//get all files names from DB when client ask for...

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Pdf2text.findById(id)
    .then(response => {
      res.status(200).json({
        message: "OK",
        file: response
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "ERROR"
      });
    });
});
router.get("/", (req, res) => {
  Pdf2text.find({}, "name")
    .then(response => {
      res.status(200).json({
        message: "OK",
        names: response
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "ERROR"
      });
    });
});

module.exports = router;
