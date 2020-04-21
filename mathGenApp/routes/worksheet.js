var express = require('express');
var session = require('express-session');
var router = express.Router();
var mongo = require('mongodb');


const workSheet = require("../models/worksheetSession.js");

/* GET worksheet page. */
router.get('/worksheet', function(req, res, next) {
  if (req.session.hasOwnProperty("mathGame"))//if there is already a math game...
  {
    var mathGame = req.session.mathGame;
    var operator = req.session.worksheetOptions['topic'];
    var answers = req.query;
    var answerObj = workSheet.checkAnswers(answers, mathGame, operator); // Number of correct answers returned
    var gameDetails = {
      gameLength: mathGame.numberList.length, //no of questions
      title: req.session.worksheetOptions['topic'], // topic
      questions: mathGame.numberList, // questions
      answers: [],
      calculatedAnswers: answerObj.calculatedAnswers,
      answerCount: answerObj.correctAnswerCount
    }
    for(let index1 = 0; index1 < gameDetails.gameLength;index1++) {
      gameDetails.answers.push({
        index: index1,
        answer: answers["answer_" + index1]
      }); 
    }
    req.session.destroy(); // clear session variables
    res.render("result", gameDetails);
  } 
  else if (!req.session.hasOwnProperty("mathGame")) { //if there isnt a math game
  console.clear();
  var options = req.session.worksheetOptions
  var newMathSheet = workSheet.createMathObj(options); // create math game, math object returned
  req.session.mathGame = newMathSheet; // assign to session variable
  console.log(newMathSheet);
  res.redirect('/storeData');
  //res.render('worksheet', newMathSheet);
  }
});   

module.exports = router;