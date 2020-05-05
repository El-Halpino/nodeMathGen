var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/home', function (request, res, next) {
  user = request.session.currentUser;
  console.log("Weclome ", user.userName);
  res.render("home", { title: "Home" , name: user.userName});
});

module.exports = router;
