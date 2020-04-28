var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET signup page. */
router.get('/signup', function (req, res, next) {
    


    res.render("signup", { title: "signup" });
});

module.exports = router;