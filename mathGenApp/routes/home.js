var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/home', function (request, res, next) {
  try {
    user = request.session.currentUser;
    if (user.type == "Student") {
      console.log("Weclome ", user.userName);
      res.render("studentHome", { title: "Home", name: user.userName, type: user.type });
    } else {
      console.log("Weclome ", user.userName);
      res.render("home", { title: "Home", name: user.userName, type: user.type });
    }
  } catch (err) {
    res.render("error", { message: "Error", error: err });
  }
});

module.exports = router;
