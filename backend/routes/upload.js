const { IncomingForm } = require("formidable");
const PDFParser = require("pdf2json");

const pdf2text = require("../models/parsePDF-model");

module.exports = function upload(req, res) {
  const form = new IncomingForm();

  form.on("file", (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    const pdfPath = file.path;
    const fileName = file.name;

    const pdfParser = new PDFParser(this, 1);

    pdfParser.on("pdfParser_dataReady", () => {
      const txt = pdfParser.getRawTextContent();
      new pdf2text({
        name: fileName,
        text: txt
      })
        .save()
        .then(newObject => {});
    });

    pdfParser.loadPDF(pdfPath);
  });

  form.on("end", () => {
    res.json();
  });

  form.parse(req);
};
