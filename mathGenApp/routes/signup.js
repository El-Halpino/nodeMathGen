var express = require('express');
var session = require('express-session');
var router = express.Router();
var bcrypt = require('bcryptjs');

const userHelpers = require("../models/userSession.js");

var userIsValid = (request, response, user, validStatus) => {
    console.log(validStatus);
    if (validStatus == true) { // User is unique, add to DB (Create User)
        userHelpers.signup(newUser);
        response.redirect("/login");
    }
    else { //User already exists, send to Signup page
        console.log("User Already Exists");
        response.render("signup", { message: "User Already Exists" });
    }
};

/* GET signup page. */
router.get('/signup', (request, response, next) => {
    request.session.destroy();
    response.render('signup.hbs');
});

/* POST signup page. */
router.post('/signup', async (request, response) => {
    try {
        console.log(request.body.email);
        hashedPass = await bcrypt.hash(request.body.pwd, 10);
        console.log("Hash", hashedPass);
        newUser = {
            userName: request.body.username,
            email: request.body.email,
            type: request.body.type,
            hashedPassword: hashedPass
        }
        userHelpers.checkUser(request, response, newUser, userIsValid);
    } catch (err) {
        console.log("Error In Signup");
        response.redirect("/signup");
    }
})

module.exports = router;