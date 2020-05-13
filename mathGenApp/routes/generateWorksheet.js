var express = require('express');
var session = require('express-session');
var router = express.Router();

const mathHelpers = require("../models/worksheetSession.js");

/* GET generateWorksheet page. */
router.get('/generateWorksheet', function (req, res, next) {
    try {
        delete session.pageLoaded;
        delete req.session.thisWorksheet;
        console.log("Generate Worksheet");
        res.render("configStudent", { title: "Worksheet Configuration" });
    } catch (err) {
        res.render("error", { message: "Error", error: err });
    }
});

router.post('/generateWorksheet', function (req, res, next) {
    try {
        if (req.session.pageLoaded == undefined) {
            req.session.pageLoaded = true;
            var options = req.body;
            if (options.topics === "Quadratic") { // Quadratic Topic
                var worksheetOptions = {
                    topic: options.topics,
                    name: options.name,
                    author: "",
                    noOfQuestions: options.questions
                }
                console.log("Create Questions")
                newWorksheet = mathHelpers.createQuadraticQuestions(worksheetOptions);
                console.log(newWorksheet);
                req.session.thisWorksheet = newWorksheet;
                res.render("quadraticWorksheetTemp", newWorksheet);
            } else { // Other Topics
                var worksheetOptions = {
                    topic: options.topics,
                    name: options.name,
                    author: "",
                    noOfQuestions: options.questions,
                    maxValue: options.max
                }
                newWorksheet = mathHelpers.createMathObj(worksheetOptions);
                console.log(newWorksheet);
                req.session.thisWorksheet = newWorksheet;
                res.render("worksheetTemp", newWorksheet);
            }
        } else { // Page has been loaded Check Answers
            console.log("Check Answers");
            delete req.session.pageLoaded;
            answers = req.body;
            console.log("Answers", answers);
            worksheet = req.session.thisWorksheet;
            console.log(worksheet);
            if (worksheet.topic === "Quadratic") {
                var worksheetDetails = mathHelpers.checkQuadraticAnswers(worksheet, answers);
                res.render("quadraticResults", worksheetDetails);
            } else {
                var worksheetDetails = mathHelpers.checkAnswers(worksheet, answers);
                res.render("studentResults", worksheetDetails);
            }
        }
    } catch (err) {
        res.render("error", { message: "Error", error: err });
    }
});

module.exports = router;