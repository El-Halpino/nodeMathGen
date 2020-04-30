var express = require('express');
var session = require('express-session');
var router = express.Router();

const userHelpers = require("../models/userSession.js");

/* GET signup page. */
router.get('/signup', function (request, response, next) {
    userDetails = req.query;
    userHelpers.signup(userDetails)

    response.redirect('/home');
});

module.exports = router;