var express = require('express');
var session = require('express-session');
var router = express.Router();

const mathHelpers = require("../models/worksheetSession.js");
const mongoHelpers = require("../models/mongoSession.js");

var renderFuncNoWorksheet = (request, response, worksheet) => {
    console.log(worksheet);
    request.session.currentWorksheet = worksheet;
    response.render("worksheet", worksheet);
  };

/* GET worksheet page. */
router.get('/worksheet', function (request, response, next) {
  console.clear();
  if (request.session.worksheetLoaded == true) { // If worksheet has been loaded
    var workSheet = request.session.currentWorksheet;
    var answers = request.query;
    var worksheetDetails = mathHelpers.checkAnswers(workSheet, answers);
    console.log(JSON.stringify(worksheetDetails));
    delete request.session.worksheetLoaded;
    delete request.session.currentWorksheet;
    response.render("result", worksheetDetails);
  }
  else { // If worksheet hasn't been loaded 
    request.session.worksheetLoaded = true;
    var workSheetID = request.query;
    console.log(workSheetID._id);
    mongoHelpers.findWorksheet(workSheetID, renderFuncNoWorksheet, request, response);
  }
});

module.exports = router;