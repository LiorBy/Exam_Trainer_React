const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ParsePDFSchema = new Schema({
    name : String,
    text : String
});

const ParsePDF = mongoose.model('parsePDF', ParsePDFSchema);

module.exports = ParsePDF;