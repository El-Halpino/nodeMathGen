var express = require('express');
var session = require('express-session');
var router = express.Router();

const mathFunction = require("../models/worksheetSession.js");

/* GET ConfigWorksheet page. */
router.get('/configWorksheet', function(req, res, next) {
    if (req.session.formLoaded == true) //If Page has been loaded...
      {
        console.log(req.query);
        var configOptions = {
            topic: req.query['topics'],
            name: req.query['name'],
            noOfQuestions: req.query['questions'],
            maxValue: req.query['max']
        }
        console.log("Hello" ,JSON.stringify(configOptions));
        req.session.worksheetOptions = configOptions;
        var newMathSheet = mathFunction.createMathObj(configOptions); // create math game, math object returned
        req.session.mathGame = newMathSheet; // assign to session variable
        console.log(newMathSheet);
        delete req.session.formLoaded;
        res.redirect('/storeData');
      }
      else { // If Page hasn't been loaded...
        console.clear();
        req.session.formLoaded = true;
        res.render("configForm", {title: "Worksheet Configuration"});
      }
});

module.exports = router;