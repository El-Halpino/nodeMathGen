var express = require('express');
var session = require('express-session');
var router = express.Router();

const mongoHelpers = require("../models/mongoSession.js");

/* GET storeData page. */
router.get('/storeData', function (req, res, next) {
    try {
        worksheetObj = req.session.mathGame;
        console.log(worksheetObj);
        mongoHelpers.storeWorksheet(worksheetObj); // Store Worksheet
        res.redirect('/viewWorksheets');
    } catch (err) {
        res.render("error", { message: "Error", error: err });
    }
});

module.exports = router;


