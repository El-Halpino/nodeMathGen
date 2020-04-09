var express = require('express');
var router = express.Router();

/* GET ConfigWorksheet page. */
router.get('/configWorksheet', function(req, res, next) {
 
  res.render("configForm", {title: "Worksheet Configuration"});
});

module.exports = router;