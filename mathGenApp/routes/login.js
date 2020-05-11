var express = require('express');
var session = require('express-session');
var router = express.Router();

const userHelpers = require("../models/userSession.js");

var redirectUser = (request, response, user, match) => {
    console.clear();
    console.log(user, match);
    if (match == true) { // Passwords Match, check type, redirect.
        // Check if user is student or teacher
        if (user.type == "Teacher") {
            request.session.currentUser = user; // load user into cookie
            response.redirect("/home");
        } else if (user.type == "Student") {
            request.session.currentUser = user; // load user into cookie
            response.redirect("/profile");
        } else {
            response.redirect("/signup");
        }
    } else { // Passwords do not Match, send user to /login
        console.log("Passwords Do Not Match");
        response.render("login", { message: "Passwords Do Not Match" });
    }
};

var checkIfValid = async (request, response, user, validStatus) => {
    console.log(validStatus);
    if (validStatus == true) { // User does not exist 
        console.log("User Does Not Exist");
        response.render("signup", { message: "User Does Not Exist" });
    }
    else { //Username exists /
        givenPass = request.body.pwd;
        userHelpers.checkPassword(request, response, user, givenPass, redirectUser);
    }
};

/* GET login page. */
router.get('/login', function (request, response, next) {
    try {
        request.session.destroy();
        response.render("login"); //Submit posts /login
    } catch (err) {
        res.render("error", { message: "Error", error: err });
    }
});

router.post('/login', function (request, response, next) {
    try {
        console.log(request.body);
        userToCheck = request.body; // .body contains given login details
        userHelpers.findUser(request, response, userToCheck, checkIfValid); // Check if username is Valid (Stored Username)
    }
    catch (err) {
        res.render("error", { message: "Error", error: err });
    }
});

module.exports = router;