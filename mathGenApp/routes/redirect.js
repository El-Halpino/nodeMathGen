var express = require('express');
var router = express.Router();

/* Redirect to Login Or Signup */
router.get('/', function(req, res, next) {
  res.render("redirect");
});

module.exports = router;
