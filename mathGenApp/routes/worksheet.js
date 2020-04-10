var express = require('express');
var session = require('express-session');
var router = express.Router();

function createMathObj(options){ // topics , noOfQuestions, maxValue
  var newMathGame = {
    title: options["topic"],
    numberList: [] //initialise list
  };
  for (var i = 0; i < options["noOfQuestions"]; i++) {
    newMathGame.numberList.push({
      index: i,
      randomNumber1: Math.round(Math.random() * options["maxValue"]),
      randomNumber2: Math.round(Math.random() * options["maxValue"])
    });
  }
  return newMathGame; //return new math obj
}

function checkAnswers(req){
  console.log(answers); // this is probably an answer, since we have data in the in session and the req.query
  var gameLength = mathGame.numberList.length;
  console.log(gameLength);
  var correctAnswerCount = 0;
  for (let index = 0; index < gameLength; index++) {
    const question = mathGame.numberList[index];
    console.log(JSON.stringify(mathGame.numberList[index]))
    var op1 = parseInt(question.randomNumber1, 10);
    var op2 = parseInt(question.randomNumber2, 10);
    var answerToCheck = answers["answer_" + index];
    if (op1 + op2 == answerToCheck) {
      correctAnswerCount++;
    }
  }
  return correctAnswerCount;
}

/* GET worksheet page. */
router.get('/worksheet', function(req, res, next) {
  if (!(
      Object.keys(req.query).length === 0 && req.query.constructor === Object
    ) &&
    req.session.hasOwnProperty("mathGame")
  ) //if there are answers do ;
  {
    console.log(req.session.MathGame);
    mathGame = req.session.mathGame;
    answers = req.query;
    var correctAns = checkAnswers();
    console.log(correctAns);
    delete req.session.mathGame;
    res.render("result", {result: correctAns} );
  }
  else if (!req.session.hasOwnProperty("mathGame")) {
  console.clear();
  var options = req.session.worksheetOptions
  console.log(JSON.stringify(options)); 
  newMathSheet = createMathObj(options);
  res.render('worksheet', newMathSheet);
  }
  else {
    res.render("worksheet", req.session.mathGame);
  }
});

module.exports = router;