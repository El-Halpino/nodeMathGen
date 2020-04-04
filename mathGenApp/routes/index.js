var express = require('express');
var session = require('express-session');
var router = express.Router();

function createMathObj(){
  var newMathGame = {
    title: "Addition",
    numberList: [] //initialise list
  };
  for (var i = 0; i < 10; i++) {
    newMathGame.numberList.push({
      index: i,
      randomNumber1: Math.round(Math.random() * 50),
      randomNumber2: Math.round(Math.random() * 50)
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
    var answerToCheck = answers["answer_" + index]; //Error here, 'answer_0' of undefined
    if (op1 + op2 == answerToCheck) {
      correctAnswerCount++;
    }
  }
  return correctAnswerCount;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!(
      Object.keys(req.query).length === 0 && req.query.constructor === Object
    ) &&
    req.session.hasOwnProperty("mathGame")
  )
  {
    mathGame = req.session.mathGame;
    answers = req.query;
    correctAns = checkAnswers(answers, mathGame);
    delete req.session.mathGame;
    res.render("result", correctAns);
  }
  else if (!req.session.hasOwnProperty("mathGame")) {
  newMathSheet = createMathObj();
  req.session.mathGame = newMathSheet;
  res.render('index', newMathSheet);
  }
  else {
    res.render("index", req.session.mathGame);
  }
});

module.exports = router;