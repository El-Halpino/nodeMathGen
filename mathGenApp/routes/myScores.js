var express = require('express');
var session = require('express-session');
var router = express.Router();

const scoreHelpers = require("../models/scoresSession.js");

var renderMyScore = (response, myScores, user) => {
    try {
        console.log(myScores, user);
        response.render("myScores", { scores: myScores, username: user.userName });
    } catch (err) {
        response.render("error", { message: "Error", error: err });
    }

}

/* GET scores page. */
router.get('/myScores', function (request, response, next) {
    try {
        user = request.session.currentUser;
        scoreHelpers.findMyScore(response, user, renderMyScore);
    } catch (err) {
        response.render("error", { message: "Error", error: err });
    }

});


module.exports = router;