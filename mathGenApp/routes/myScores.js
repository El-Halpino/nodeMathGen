var express = require('express');
var session = require('express-session');
var router = express.Router();

const scoreHelpers = require("../models/scoresSession.js");

var renderMyScore = (response, myScores, user) => {
    console.log(myScores, user);
    response.render("myScores", {scores: myScores, username: user.userName});
}

/* GET scores page. */
router.get('/myScores', function (request, response, next) {
    user = request.session.currentUser;
    scoreHelpers.findMyScore(response, user, renderMyScore);
}); 


module.exports = router;