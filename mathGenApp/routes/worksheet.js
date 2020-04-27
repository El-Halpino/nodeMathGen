var express = require('express');
var session = require('express-session');
var router = express.Router();

const mathHelpers = require("../models/worksheetSession.js");
const mongoHelpers = require("../models/mongoSession.js")

var renderFuncNoWorksheet = (request, response, worksheetObj) => {
  return (worksheetObj) => {
    console.log(worksheetObj)
    request.session.currentWorksheet = worksheetObj;
    response.render("worksheet", worksheetObj);
  };
};

/* GET worksheet page. */
router.get('/worksheet', function (req, res, next) {
  console.clear();
  if (req.session.worksheetLoaded == true) { // If worksheet has been loaded
    var workSheet = req.session.currentWorksheet;
    var answers = req.query;
    var worksheetDetails = mathHelpers.checkAnswers(workSheet, answers);
    console.log(JSON.stringify(worksheetDetails));
    delete req.session.worksheetLoaded;
    delete req.session.currentWorksheet;
    res.render("result", worksheetDetails);
  }
  else { // If worksheet hasn't been loaded
    req.session.worksheetLoaded = true;
    var workSheetID = req.query;
    console.log(workSheetID._id);
    mongoHelpers.findWorksheet(workSheetID, renderFuncNoWorksheet());
  }
});

module.exports = router;