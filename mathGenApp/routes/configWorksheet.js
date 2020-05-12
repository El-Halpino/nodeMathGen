var express = require('express');
var session = require('express-session');
var router = express.Router();

const mathHelpers = require("../models/worksheetSession.js");

/* GET ConfigWorksheet page. */
router.get('/configWorksheet', function (req, res, next) {
  try {
    if (req.session.currentUser == undefined) {
      throw "User not Logged In";
    }
    res.render("configForm", { title: "Worksheet Configuration" });
  } catch (err) {
    res.render("error", { message: "Error", error: err });
  }
});
/* POST ConfigWorksheet page. */
router.post('/configWorksheet', function (req, res, next) {
  try {
    user = req.session.currentUser;
    if (req.body.topics == "Quadratic") {
      var configOptions = {
        topic: req.body['topics'],
        name: req.body['name'],
        noOfQuestions: req.body['questions'],
        author: user.userName
      }
      var newMathSheet = mathHelpers.createQuadraticQuestions(configOptions);
      req.session.mathGame = newMathSheet;
      console.log(newMathSheet);
      res.redirect('/storeData');
    } else {
      console.log("name: ", user.userName);
      console.log(req.body);
      var configOptions = {
        topic: req.body['topics'],
        name: req.body['name'],
        noOfQuestions: req.body['questions'],
        maxValue: req.body['max'],
        author: user.userName
      }
      console.log(JSON.stringify(configOptions));
      req.session.worksheetOptions = configOptions;
      var newMathSheet = mathHelpers.createMathObj(configOptions); // create math game, math object returned
      req.session.mathGame = newMathSheet; // assign to session variable
      console.log(newMathSheet);
      res.redirect('/storeData');
    }
  } catch (err) {
    res.render("error", { message: "Error", error: err });
  }
});

module.exports = router;