var express = require('express');
var router = express.Router();

/* Redirect to Home */
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

module.exports = router;
