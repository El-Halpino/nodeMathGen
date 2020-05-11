var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET logout page. */
router.get('/logout', function (request, res, next) {
    try {
        request.session.destroy();
        res.render("login", { message: "Logout Successful" });
    } catch (err) {
        res.render("error", { message: "Error", error: err });
    }
});

module.exports = router;