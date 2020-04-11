var express = require('express');
var router = express.Router();


/* GET ConfigWorksheet page. */
router.get('/configWorksheet', function(req, res, next) {
    if (req.session.formLoaded == true)
      {
        console.log(req.query);
        var configOptions = {
            topic: req.query['topics'],
            noOfQuestions: req.query['questions'],
            maxValue: req.query['max']
        }
        console.log("Helo" ,JSON.stringify(configOptions));
        req.session.worksheetOptions = configOptions;
        delete req.session.formLoaded;
        res.redirect("/worksheet");
      }
      else {
        req.session.formLoaded = true;
        res.render("configForm", {title: "Worksheet Configuration"});
      }
});

module.exports = router;