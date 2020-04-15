let createMathObj = function (options){ // topic , noOfQuestions, maxValue
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
  
  let checkAnswers = function (answers, mathGame, operator) {
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

module.exports = {
    createMathObj: createMathObj,
    checkAnswers: checkAnswers
  };