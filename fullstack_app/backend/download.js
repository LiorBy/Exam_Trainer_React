const express = require('express');
const router = express.Router();
const Pdf2text = require('./models/parsePDF-model');

//get all files names from DB when client ask for...


router.get('/', (req, res) => {

    let onlyNames = req.query.getOnlyNames;
    console.log("line 11  " + onlyNames)

    if (onlyNames === undefined) {
        let id = req.query.id;
        console.log("ID: " + id)
        Pdf2text.findById(id).then(response => {
            res.status(200).json({
                message: 'OK',
                text: response
            })
        }).catch(err => {
            res.status(500).json({
                message: 'ERROR'
            })
        })
    }
    else {
        console.log('line 28');
        Pdf2text.find({}, 'name').then(response => {
            res.status(200).json({
                message: 'OK',
                names: response
            })
        }).catch(err => {
            res.status(500).json({
                message: 'ERROR'
            })
        })
    }
});


module.exports = router;