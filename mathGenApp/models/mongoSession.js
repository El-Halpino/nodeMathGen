var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";
// Collection Worksheets

let findWorksheet = function (workSheetID, callback, request, response) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        var query = { "_id": ObjectId(workSheetID._id) };
        dbo.collection("worksheets").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result[0].name);
            console.log(typeof (result));
            db.close();
            var worksheetObj = {
                name: result[0].name,
                topic: result[0].topic,
                numberList: result[0].numberList
            }
            console.log(worksheetObj, "Inside Function"); //object is ok
            callback(request, response, worksheetObj);
        });
    });
}

let findWorksheetList = function (callback, response) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        dbo.collection("worksheets").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result));
            db.close();
            callback(result, response);
        })
    });
}

let storeWorksheet = function (worksheetObj) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        var myobj = { name: worksheetObj.name, author: worksheetObj.author, topic: worksheetObj.title, numberList: worksheetObj.numberList };
        dbo.collection("worksheets").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 worksheet inserted");
            db.close();
            return;
        });
    });
}

module.exports = {
    findWorksheet: findWorksheet,
    findWorksheetList: findWorksheetList,
    storeWorksheet: storeWorksheet
};