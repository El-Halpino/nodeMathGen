var express = require('express');
var session = require('express-session');
var router = express.Router();

const mathHelpers = require("../models/worksheetSession.js");
const mongoHelpers = require("../models/mongoSession.js");
const scoreHelpers = require("../models/scoresSession.js");

var renderFuncNoWorksheet = (request, response, worksheet) => {
  console.log(worksheet);
  request.session.currentWorksheet = worksheet;
  response.render("worksheet", worksheet);
};

var renderResultsFunc = (request, response, saveTheScore) => {
  worksheetDetails = request.session.worksheetDetails
  if (saveTheScore == true) {
    workSheet = request.session.currentWorksheet;
    user = request.session.currentUser;
    scoreHelpers.saveScore(workSheet.author, worksheetDetails.correctAnswerCount, worksheetDetails.name, user.userName);
    response.render("result", worksheetDetails);
  } else {
    response.render("result", worksheetDetails);
  }
};

/* GET worksheet page. */
router.get('/worksheet', function (request, response, next) {
  console.clear();
  if (request.session.worksheetLoaded == true) { // If worksheet has been loaded
    var workSheet = request.session.currentWorksheet;
    var answers = request.query;
    console.log("ANSWERS", answers);
    var worksheetDetails = mathHelpers.checkAnswers(workSheet, answers);
    console.log("Worksheet Details", worksheetDetails);
    request.session.worksheetDetails = worksheetDetails;
    user = request.session.currentUser;
    scoreHelpers.checkScore(request, response, workSheet.author, worksheetDetails.correctAnswerCount, worksheetDetails.name, user.userName, renderResultsFunc);
  }
  else { // If worksheet hasn't been loaded 
    request.session.worksheetLoaded = true;
    var workSheetID = request.query;
    console.log(workSheetID._id);
    mongoHelpers.findWorksheet(workSheetID, renderFuncNoWorksheet, request, response);
  }
});

module.exports = router;