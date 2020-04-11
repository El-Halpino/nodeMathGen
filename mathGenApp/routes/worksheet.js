var express = require('express');
var session = require('express-session');
var router = express.Router();

function createMathObj(options){ // topic , noOfQuestions, maxValue
  var newMathGame = {
    title: options["topic"],
    numberList: [] //initialise list
  };
  for (var i = 0; i < options["noOfQuestions"]; i++) {
    newMathGame.numberList.push({
      index: i,
      randomNumber1: Math.round(Math.random() * options["maxValue"]), // Random Numbers assigned an index, pushed into List
      randomNumber2: Math.round(Math.random() * options["maxValue"])
    });
  }
  return newMathGame; //return new math obj
}

function checkAnswers(answers, mathGame, operator){
  var operators = { // change operator depending on 'operator' value passed.
    'Addition': function(a, b) { return a + b},
    'Subtraction': function(a, b) { return a - b},
    'Multiplication': function(a, b) { return a * b},
    'Division': function(a, b) { return a / b}
  }
  console.log(answers); 
  var gameLength = mathGame.numberList.length;
  console.log(gameLength);
  var correctAnswerCount = 0;
  for (let index = 0; index < gameLength; index++) { // loop
    const question = mathGame.numberList[index];
    console.log(JSON.stringify(mathGame.numberList[index]))
    var op1 = parseInt(question.randomNumber1, 10);
    var op2 = parseInt(question.randomNumber2, 10);
    var answerToCheck = answers["answer_" + index]; // for loop iterates index for each answer...
    console.log('result = ', operators[operator](op1,op2), ' answer = ', answerToCheck); // Generated result and user answer
    if (operators[operator](op1,op2) == answerToCheck) { // check if results matches user answer
      correctAnswerCount++; //increment count
    }
  } //loop
  return correctAnswerCount;
}

/* GET worksheet page. */
router.get('/worksheet', function(req, res, next) {
  if (req.session.hasOwnProperty("mathGame"))//if there is already a math game...
  {
    var mathGame = req.session.mathGame;
    var answers = req.query;
    var operator = req.session.worksheetOptions['topic'];
    var correctAns = checkAnswers(answers, mathGame, operator); // Number of correct answers returned
    console.log(correctAns);
    delete req.session.mathGame;
    delete req.session.worksheetOptions; // clear session variables
    res.render("result", {result: correctAns} );
  }
  else if (!req.session.hasOwnProperty("mathGame")) { //if there isnt a math game
  console.clear();
  var options = req.session.worksheetOptions
  console.log(JSON.stringify(options)); 
  var newMathSheet = createMathObj(options);
  console.log(JSON.stringify(newMathSheet)); // create math game, math object returned
  req.session.mathGame = newMathSheet; // assign to session variable
  res.render('worksheet', newMathSheet);
  }
});

module.exports = router;