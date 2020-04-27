var express = require('express');
var session = require('express-session');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//mongod needs to be active in order to Access DB

/* GET viewWorksheets page. */
router.get('/viewWorksheets', function (req, res, next) {
    req.session.destroy();
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        dbo.collection("worksheets").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result));
            db.close();
            res.render("dataStored", { worksheets: result });
        })
        //.catch(error => console.error(error));
    });
});

module.exports = router;