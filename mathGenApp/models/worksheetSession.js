//Quadratic Equations
let createQuadraticQuestions = function (options) {
  var newMathGame = {
    title: options["topic"],
    name: options["name"],
    author: options["author"],
    numberList: []
  }
  for (var i = 0; i < options["noOfQuestions"]; i++) {
    newMathGame.numberList.push({
      index: i, // Random Numbers assigned an index, pushed into List
      randomNumber1: Math.round(Math.random() * 6) + 1, // X squared coefficient cannot be 0 so +1
      randomNumber2: Math.round(Math.random() * 30), // X coefficient  
      randomNumber3: Math.round(Math.random() * 150), // Constant 
    });
  }
  return newMathGame;
}

let checkQuadraticAnswers = function (worksheet, answers) {
  var worksheetDetails = { // returned Obj
    name: worksheet.name,
    topic: worksheet.topic,
    questions: worksheet.numberList,
    noOfQuestions: worksheet.numberList.length,
    userAnswers: [],
    calculatedAnswers: [],
    correctAnswerCount: 0
  }
  for (let index1 = 0; index1 < worksheetDetails.noOfQuestions; index1++) {
    worksheetDetails.userAnswers.push({
      "answerPlus": answers["answerPlus_" + index1],
      "answerNeg": answers["answerNeg_" + index1]
    });
  }
  for (var i = 0; i < worksheetDetails.noOfQuestions; i++) { // Calculate Answers using -b formula (Quadratic Solver)
    var question = worksheet.numberList[i];
    var a = parseInt(question.randomNumber1, 10); // X squared coefficient
    var b = parseInt(question.randomNumber2, 10); // X coefficient  
    var c = parseInt(question.randomNumber3, 10); // Constant 
    var squareRoot = Math.sqrt(b * b - 4 * a * (-c)); // Within the square root 
    var under = 2 * a; // Denominator
    var positiveAns = (-b + squareRoot) / under;
    var negativeAns = (-b - squareRoot) / under;
    var limit = positiveAns.toFixed(6); // Round answers to 6 decimal places
    var limit1 = negativeAns.toFixed(6) 
    var finalPos = parseFloat(limit);
    var finalNeg = parseFloat(limit1);
    worksheetDetails.calculatedAnswers.push({ "answerPlus": finalPos, "answerNeg": finalNeg }); // Push calculated answers to worksheet details
    var posAnswerToCheck = answers["answerPlus_" + i];
    var negAnswerToCheck = answers["answerNeg_" + i];
    if (finalPos == posAnswerToCheck && finalNeg == negAnswerToCheck) { // If calculated answers equal user answers, increment correctAnswerCount
      worksheetDetails.correctAnswerCount++;
    }
  }
  return worksheetDetails;
}

//Simple Topics
let createMathObj = function (options) { // topic , name, noOfQuestions, maxValue
  var newMathGame = {
    title: options["topic"],
    name: options["name"],
    author: options["author"],
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
// answers, mathGame, operator
let checkAnswers = function (workSheet, answers) {
  var operators = { // change operation depending on 'topic' value passed.
    'Addition': function (a, b) { return a + b },
    'Subtraction': function (a, b) { return a - b },
    'Multiplication': function (a, b) { return a * b },
    'Division': function (a, b) { return a / b }
  }
  var worksheetDetails = { // returned Obj
    name: workSheet.name,
    topic: workSheet.topic,
    questions: workSheet.numberList,
    noOfQuestions: workSheet.numberList.length,
    userAnswers: [],
    calculatedAnswers: [],
    correctAnswerCount: 0
  }
  for (let index1 = 0; index1 < worksheetDetails.noOfQuestions; index1++) {
    worksheetDetails.userAnswers.push({
      "answer": answers["answer_" + index1]
    });
  }
  console.log(answers);
  gameLength = workSheet.numberList.length;
  console.log(gameLength);
  for (let index = 0; index < gameLength; index++) { // loop
    const question = workSheet.numberList[index];
    console.log(JSON.stringify(workSheet.numberList[index]))
    var op1 = parseInt(question.randomNumber1, 10);
    var op2 = parseInt(question.randomNumber2, 10);
    var answerToCheck = answers["answer_" + index]; // for loop iterates index for each answer...
    console.log('answer = ', operators[workSheet.topic](op1, op2), 'user answer = ', answerToCheck); // Generated result and user answer
    var ans = operators[workSheet.topic](op1, op2);
    var limit = ans.toFixed(3); // Round answers to 3 decimal places
    var finalAns = parseFloat(limit, 10);
    worksheetDetails.calculatedAnswers.push({ answer: finalAns });
    if (finalAns == answerToCheck) { // check if results matches user answer
      worksheetDetails.correctAnswerCount++; //increment count
    }
  } //loop
  return worksheetDetails;
}

module.exports = {
  createMathObj: createMathObj,
  checkAnswers: checkAnswers,
  createQuadraticQuestions: createQuadraticQuestions,
  checkQuadraticAnswers: checkQuadraticAnswers
};