var express = require('express');
var router = express.Router();

function createMathObj(){
  var newMathGame = {
    title: "Addition",
    numberList: []
  };
  for (var i = 0; i < 10; i++) {
    newMathGame.numberList.push({
      index: i,
      randomNumber1: Math.round(Math.random() * 50),
      randomNumber2: Math.round(Math.random() * 50)
    });
  }
  return newMathGame;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  newMathSheet = createMathObj();
  res.render('index', newMathSheet);
});

module.exports = router;