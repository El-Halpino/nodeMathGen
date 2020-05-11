var express = require('express');
var router = express.Router();

/* Redirect to Login Or Signup */
router.get('/', function (req, res, next) {
  try {
    res.render("redirect");
  } catch (err) {
    res.render("error", { message: "Error", error: err });
  }
});

module.exports = router;
