var express = require('express');
var session = require('express-session');
var router = express.Router();

const mathHelpers = require("../models/worksheetSession.js");
const mongoHelpers = require("../models/mongoSession.js");
const scoreHelpers = require("../models/scoresSession.js");

var renderFuncNoWorksheet = (request, response, worksheet) => {
  try {
    // render the worksheet
    console.log(worksheet);
    request.session.currentWorksheet = worksheet;
    user = request.session.currentUser;
    if (user.type == "Student") {
      if (worksheet.topic == "Quadratic") {
        response.render("quadraticWorksheet", worksheet);
      } else {
        response.render("studentWorksheet", worksheet);
      }
    } else {
      if (worksheet.topic == "Quadratic") {
        response.render("quadraticWorksheet", worksheet);
      } else {
        response.render("worksheet", worksheet);// render normal worksheet
      }
    }
  } catch (err) {
    response.render("error", { message: "Error", error: err });
  }
};

var renderResultsFunc = (request, response, saveTheScore) => { // render results
  worksheetDetails = request.session.worksheetDetails
  user = request.session.currentUser;
  workSheet = request.session.currentWorksheet;
  if (user.type == "Student" && saveTheScore == true && worksheetDetails.topic == "Quadratic") {
    scoreHelpers.saveScore(workSheet.author, worksheetDetails.correctAnswerCount, worksheetDetails.name, user.userName);
    response.render("quadraticResults", worksheetDetails);
  } else if (user.type == "Student" && saveTheScore == true && worksheetDetails.topic != "Quadratic") {
    scoreHelpers.saveScore(workSheet.author, worksheetDetails.correctAnswerCount, worksheetDetails.name, user.userName);
    response.render("studentResults", worksheetDetails);
  } else if (user.type == "Student" && saveTheScore == false && worksheetDetails.topic == "Quadratic") {
    response.render("quadraticResults", worksheetDetails);
  } else if (user.type == "Student" && saveTheScore == false && worksheetDetails.topic != "Quadratic") {
    response.render("studentResults", worksheetDetails);
  } else { //Teacher Dont Save Score
    if (worksheetDetails.topic == "Quadratic") {
      response.render("quadraticResults", worksheetDetails);
    } else {
      response.render("result", worksheetDetails);
    }
  }
};

/* GET worksheet page. */
router.get('/worksheet', function (request, response, next) {
  try {
    if (request.session.worksheetLoaded == true) { // If worksheet has been loaded
      var workSheet = request.session.currentWorksheet;
      var answers = request.query;
      console.log("ANSWERS", answers);
      if (workSheet.topic == "Quadratic") {
        var worksheetDetails = mathHelpers.checkQuadraticAnswers(workSheet, answers);
      } else { // The other topics..
        var worksheetDetails = mathHelpers.checkAnswers(workSheet, answers);
      }
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
  } catch (err) {
    response.render("error", { message: "Error", error: err });
  }
});
/* POST worksheet page. */
router.post('/worksheet', function (request, response, next) {
  try {
    request.session.worksheetLoaded = true;
    mongoHelpers.findWorksheetBySearch(request, response, request.body.teacher, request.body.worksheetName, renderFuncNoWorksheet);
  } catch (err) {
    response.render("error", { message: "Error", error: err });
  }
})

module.exports = router;