var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET login page. */
router.get('/login', function (req, res, next) {
    


    res.render("login", { title: "Login" });
});

module.exports = router;