var express = require('express');
var session = require('express-session');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET storeData page. */
router.get('/storeData', function(req, res, next) {

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: "Company Inc", address: "Highway 37"};
    dbo.collection("customers").insertOne(myobj, function(err,res) {
        if (err) throw err;
        console.log("1 document inserted")
        db.close();
        });
    });

    res.render("dataStored", {title: "Your Data Has Been Stored"});
});
  
  module.exports = router;


