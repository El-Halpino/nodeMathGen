var express = require('express');
var session = require('express-session');
var router = express.Router();

const mongoHelpers = require("../models/mongoSession.js")

var renderFuncNoWorksheet = (result, response) => {
    console.log(result);
    response.render("viewWorksheets", { worksheets: result });
  };

/* GET viewWorksheets page. */
router.get('/viewWorksheets', function (request, response, next) {
    request.session.destroy();
    mongoHelpers.findWorksheetList(renderFuncNoWorksheet, response);
});

module.exports = router;