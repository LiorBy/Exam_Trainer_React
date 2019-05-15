const IncomingForm = require('formidable').IncomingForm;
const pdfUtil = require('pdf-to-text');
var extract = require('pdf-text-extract');
const fs = require('fs');
//const path = require('path');
const PDFParser = require("pdf2json");
var option = { from: 0, to: 10 };







module.exports = function upload(req, res) {
    var form = new IncomingForm();

    form.on('file', (field, file) => {
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path
        console.log(typeof file.path);
        var pdf_path = file.path;
        let fileName = file.name;
        let tempFpath = 'C:\\Users\\USER\\Desktop\\hello world.pdf';
        const pathDesktop = 'C:\\Users\\USER\\Desktop\\';
        //filePath += '.pdf';
        console.log(pdf_path);

        let pdfParser = new PDFParser(this, 1);



        pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError + ' line 31'));
        pdfParser.on("pdfParser_dataReady", pdfData => {
            fs.writeFile(pathDesktop + 'hello world2.txt', pdfParser.getRawTextContent(), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
            //res.send(pdfParser.getRawTextContent());
            //res.send(JSON.stringify(pdfData));
            console.log(pdfParser.getRawTextContent());
        });

        pdfParser.loadPDF(pdf_path);
    });

    form.on('end', () => {
        res.json();
        //res.send(pdfParser.getRawTextContent());
    })

    form.parse(req);

}