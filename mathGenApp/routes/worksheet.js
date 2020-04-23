var express = require('express');
var session = require('express-session');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
var url = "mongodb://localhost:27017/";

const mathFunction = require("../models/worksheetSession.js");

/* GET worksheet page. */
router.get('/worksheet', function(req, res, next) {
  console.clear();
  if (req.session.worksheetLoaded == true) {
    var workSheet = req.session.currentWorksheet;
    var answers = req.query;
    var worksheetDetails = mathFunction.checkAnswers(workSheet, answers);
    console.log(JSON.stringify(worksheetDetails));
    delete req.session.worksheetLoaded;
    delete req.session.currentWorksheet;
    res.render("result", worksheetDetails);
  }
  else 
  {
    console.clear();
    req.session.worksheetLoaded = true;
    var workSheetID = req.query;
    console.log(workSheetID._id);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("appDB");
      var query = {"_id" : ObjectId(workSheetID._id)};
      dbo.collection("worksheets").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result[0].name);
        console.log(typeof(result));
        db.close();
        var worksheetObj = {
          name: result[0].name,
          topic: result[0].topic,
          numberList: result[0].numberList
        }
        req.session.currentWorksheet = worksheetObj;
        res.render("worksheet", worksheetObj);
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