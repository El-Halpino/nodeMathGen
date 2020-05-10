var express = require('express');
var session = require('express-session');
var router = express.Router();

const mongoHelpers = require("../models/mongoSession.js")

var renderFuncNoWorksheet = (result, request, response) => {
  console.log(result);
  response.render("viewWorksheets", { worksheets: result });
};

/* GET viewWorksheets page. */
router.get('/viewWorksheets', function (request, response, next) {
  delete request.session.worksheetLoaded;
  mongoHelpers.findWorksheetList(renderFuncNoWorksheet, request, response);
});

/* POST viewWorksheets page. */
router.post('/viewWorksheets', async function (request, response, next) {
  worksheetID = request.body._id;
  console.log("HERE", worksheetID);
  mongoHelpers.deleteWorksheet(renderFuncNoWorksheet, response, worksheetID); // Delete Function Not Working
});


module.exports = router;