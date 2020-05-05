var express = require('express');
var session = require('express-session');
var router = express.Router();

const userHelpers = require("../models/userSession.js");

var redirectUser = (request, response, user, match) => {
    console.log("here", user, match);
    if (match == true) { // Passwords Match, send user to /home
        // Check if user is student or teacher
        request.session.currentUser = user;
        response.redirect("/home");
    } else {
        console.log("Passwords Do Not Match"); // Passwords do not Match, send user to /login
        response.render("login", {message: "Passwords Do Not Match"});
    }
};

var checkIfValid = async (request, response, user, validStatus) => {
    console.log(validStatus);
    if (validStatus == true) { // User does not exist 
        console.log("User Does Not Exist");
        response.render("signup", {message: "User Does Not Exist"});
    }
    else { //Username exists /
        givenPass = request.body.pwd;
        userHelpers.checkPassword(request, response, user, givenPass, redirectUser)
        console.log(user)
    }
};

/* GET login page. */
router.get('/login', function (request, response, next) {
    response.render("login");
});

router.post('/login', function (request, response, next) {
    console.log(request.body);
    userToCheck = request.body;
    try {
        userHelpers.findUser(request, response, userToCheck, checkIfValid);
    }
    catch (err) {
        console.log("Error In Login");
        response.redirect("/login");
    }

});

module.exports = router;