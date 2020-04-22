var express = require('express');
var session = require('express-session');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
var url = "mongodb://localhost:27017/";

const workSheet = require("../models/worksheetSession.js");

/* GET worksheet page. */
router.get('/worksheet', function(req, res, next) {

  if (req.session.worksheetLoaded == true) {

    delete req.session.worksheetLoaded;
  }
  else 
  {
    console.clear();
    workSheetID = req.query;
    console.log(workSheetID._id);
    req.session.worksheetLoaded = true;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("appDB");
      var query = {"_id" : ObjectId(workSheetID._id)};
      dbo.collection("worksheets").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        Object.assign({}, result);
        db.close();
        res.render("worksheet",result);
      });
    }); 
  }
});   

module.exports = router;

// ObjectId("5ea09f7562dce42835ba1d3d")


/*
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
*/