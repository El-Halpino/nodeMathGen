var express = require('express');
var session = require('express-session');
var router = express.Router();

const scoreHelpers = require("../models/scoresSession.js");

/* GET scores page. */
router.get('/scores', function (request, res, next) {
    user = request.session.currentUser;
    console.log("Weclome ", user.userName);
    res.render("scoreSearch", { name: user.userName });
});

/* POST scores page. */
router.post('/scores', function (request, res, next) {
    user = request.session.currentUser;
    console.log("Weclome ", user.userName);

    res.render("scores", { });
});

module.exports = router;
