var express = require('express');
var session = require('express-session');
var router = express.Router();


const userHelpers = require("../models/userSession.js"); 

var checkIfValid = (request, response, user, validStatus) => {
    console.log(validStatus);
    if (validStatus == true) { // User does not exist
        console.log("User Does Not Exist");
        response.redirect("/signup");
    }
    else { //Username exists /
        console.log(user)
        passwordCheck = userHelpers.checkPassword(user);
        console.log(passwordCheck);
        response.redirect("/home");
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