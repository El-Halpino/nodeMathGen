var express = require('express');
var session = require('express-session');
var router = express.Router();

const userHelpers = require("../models/userSession.js");

/* GET Profile page. */
router.get('/profile', function (request, res, next) {
  try {
    user = request.session.currentUser;
    if (user.type == "Student") {
      res.render("studentProfile", { user: user });
    } else {
      console.log("Weclome ", user.userName);
      res.render("profile", { user: user });
    }
  } catch (err) {
    res.render("error", { message: "Error", error: err });
  }
});

module.exports = router;