var express = require('express');
var session = require('express-session');
var router = express.Router();

const scoreHelpers = require("../models/scoresSession.js");

var renderScores = (scoreList, response) => {
    console.log(scoreList);
    response.render("scores", { scores: scoreList });
};

/* GET scores page. */
router.get('/scores', function (request, res, next) {
    user = request.session.currentUser;
    console.log("Weclome ", user.userName);
    // Send list of worksheets and teachers
    res.render("scoreSearch", { name: user.userName });
}); 

/* POST scores page. */
router.post('/scores', function (request, response, next) {
    user = request.session.currentUser;
    console.log(user.userName);
    scoreHelpers.findScores(response, request.body.teacher, request.body.worksheetName, renderScores);
});

module.exports = router;
