const mongoose = require("mongoose");

const ParsePDFSchema = new mongoose.Schema({
  name: String,
  text: String
});

const ParsePDF = mongoose.model("parsePDF", ParsePDFSchema);

module.exports = ParsePDF;
