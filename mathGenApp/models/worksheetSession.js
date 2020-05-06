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
    if (operators[workSheet.topic](op1, op2) == answerToCheck) { // check if results matches user answer
      worksheetDetails.correctAnswerCount++; //increment count
    }
    worksheetDetails.calculatedAnswers.push({ answer: operators[workSheet.topic](op1, op2) });
  } //loop
  return worksheetDetails;
}

module.exports = {
  createMathObj: createMathObj,
  checkAnswers: checkAnswers
};