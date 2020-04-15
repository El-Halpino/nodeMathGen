var express = require('express');
var session = require('express-session');
var router = express.Router();

const workLib = require("./worksheet_modules/worksheetSession");

/*
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
  var answerObj = {
    correctAnswerCount: 0,
    answerIndex: []
  }
  console.log(answers); 
  gameLength = mathGame.numberList.length;
  console.log(gameLength);
  for (let index = 0; index < gameLength; index++) { // loop
    const question = mathGame.numberList[index];
    console.log(JSON.stringify(mathGame.numberList[index]))
    var op1 = parseInt(question.randomNumber1, 10);
    var op2 = parseInt(question.randomNumber2, 10);
    var answerToCheck = answers["answer_" + index]; // for loop iterates index for each answer...
    console.log('answer = ', operators[operator](op1,op2), 'user answer = ', answerToCheck); // Generated result and user answer
    if (operators[operator](op1,op2) == answerToCheck) { // check if results matches user answer
      answerObj.correctAnswerCount++; //increment count
      answerObj.answerIndex.push(index);
    }
  } //loop
  return answerObj;
} */

/* GET worksheet page. */
router.get('/worksheet', function(req, res, next) {
  if (req.session.hasOwnProperty("mathGame"))//if there is already a math game...
  {
    var mathGame = req.session.mathGame;
    var operator = req.session.worksheetOptions['topic'];
    var answers = req.query;
    var answerObj = workLib.checkAnswers(answers, mathGame, operator); // Number of correct answers returned
    var gameDetails = {
      gameLength: mathGame.numberList.length, //no of questions
      title: req.session.worksheetOptions['topic'], // topic
      numberList: mathGame.numberList, // questions
      answerIndex: answerObj.answerIndex, // index of correct answers
      answerCount: answerObj.correctAnswerCount
    }
    console.clear();
    /*
    for(let index1 = 0; index1 < gameDetails.gameLength;index1++) {
      gameDetails.numberList.unshift({answer: answers["answer_" + index1]}); 
    } */
    console.log(gameDetails.numberList);
    console.log(answerObj.correctAnswerCount);
    req.session.destroy(); // clear session variables
    res.render("result", gameDetails);
  } 
  else if (!req.session.hasOwnProperty("mathGame")) { //if there isnt a math game
  console.clear();
  var options = req.session.worksheetOptions
  console.log(JSON.stringify(options)); 
  var newMathSheet = workLib.createMathObj(options);
  console.log(JSON.stringify(newMathSheet)); // create math game, math object returned
  req.session.mathGame = newMathSheet; // assign to session variable
  res.render('worksheet', newMathSheet);
  }
});

module.exports = router;