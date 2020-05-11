var express = require('express');
var session = require('express-session');
var router = express.Router();

const scoreHelpers = require("../models/scoresSession.js");
const userHelpers = require("../models/userSession.js");
const mongoHelpers = require("../models/mongoSession.js");

var renderScoreSearch = (worksheetList, request, response) => {
    request.session.worksheetList = worksheetList;
    user = request.session.currentUser;
    teacherList = request.session.teacherList;
    console.log("Weclome ", user.userName);
    response.render("scoreSearch", { name: user.userName, teachers: teacherList, worksheets: worksheetList });
};

var findWorksheets = (teacherList, request, response) => {
    console.log(teacherList);
    request.session.teacherList = teacherList;
    mongoHelpers.findWorksheetList(renderScoreSearch, request, response);
};

var renderScores = (scoreList, request, response) => {
    worksheetList = request.session.worksheetList;
    teacherList = request.session.teacherList;
    console.log(scoreList, teacherList, worksheetList);
    response.render("scores", { scores: scoreList, teachers: teacherList, worksheets: worksheetList });
};

/* GET scores page. */
router.get('/scores', function (request, response, next) {
    try {
        // Send list of worksheets and teachers
        var type = "Teacher";
        userHelpers.findUsers(request, response, type, findWorksheets)
    } catch (err) {
        res.render("error", { message: "Error", error: err });
    }

});

/* POST scores page. */
router.post('/scores', function (request, response, next) {
    try {
        user = request.session.currentUser;
        console.log(user.userName);
        scoreHelpers.findScores(request, response, request.body.teacher, request.body.worksheetName, renderScores);// find score
    } catch (err) {
        res.render("error", { message: "Error", error: err });
    }
});

module.exports = router;
