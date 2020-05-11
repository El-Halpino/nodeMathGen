var express = require('express');
var session = require('express-session');
var router = express.Router();

const mongoHelpers = require("../models/mongoSession.js")

var renderFuncNoWorksheet = (result, request, response) => {
  console.log(result);
  user = request.session.currentUser;
  if(user.type == "Student") {
    response.render("studentViewWorksheets", { worksheets: result });
  } else {
    response.render("viewWorksheets", { worksheets: result });
  }
};

/* GET viewWorksheets page. */
router.get('/viewWorksheets', function (request, response, next) {
  try {
    delete request.session.worksheetLoaded;
    mongoHelpers.findWorksheetList(renderFuncNoWorksheet, request, response);
  } catch (err) {
    response.render("error", { message: "Error", error: err });
  }
});

/* POST viewWorksheets page. */
router.post('/viewWorksheets', async function (request, response, next) { // Post is used to delete worksheets
  try {
    worksheetID = request.body._id;
    console.log("HERE", worksheetID);
    mongoHelpers.deleteWorksheet(renderFuncNoWorksheet, request, response, worksheetID); // Delete Function
  } catch (err) {
    response.render("error", { message: "Error", error: err });
  }
});


module.exports = router;