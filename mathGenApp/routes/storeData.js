var express = require('express');
var session = require('express-session');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET storeData page. */
router.get('/storeData', function(req, res, next) {

worksheetObj = req.session.mathGame;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appDB");
    var myobj = { name: worksheetObj.name, topic: worksheetObj.title, numberList: worksheetObj.numberList};
    dbo.collection("worksheets").insertOne(myobj, function(err,res) {
        if (err) throw err;
        console.log("1 worksheet inserted");
        db.close();
        });
    });
    res.redirect('/viewWorksheets');
});
  
  module.exports = router;


