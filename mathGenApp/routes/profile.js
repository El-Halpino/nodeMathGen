var express = require('express');
var session = require('express-session');
var router = express.Router();

const userHelpers = require("../models/userSession.js");

/* GET Profile page. */
router.get('/profile', function (request, res, next) {
  try {
    user = request.session.currentUser;
    console.log("Weclome ", user.userName);
    res.render("profile",{user: user});
  } catch (err) {
    res.render("error", {message: "Error", error: err});
  }
});

/* POST Profile page. */
router.post('/profile', function (request, res, next) { // create a class
    try {
      user = request.session.currentUser;

        
    } catch (err) {
      res.render("error", {message: "Error", error: err});
    }
  });

module.exports = router;