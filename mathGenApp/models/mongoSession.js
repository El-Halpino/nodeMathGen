var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const mongodb = require('mongodb');
var url = "mongodb://localhost:27017/";

// Collection Worksheets

let findWorksheetBySearch = function (request, response, teacher, worksheetName, callback) { // Search by author and worksheetName
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        var query = { author: teacher, name: worksheetName };
        dbo.collection("worksheets").findOne(query, function (err, result) {
            if (err) throw err;
            console.log(result);
            console.log(typeof (result));
            db.close();
            console.log(result, "Inside Function"); //object is ok
            callback(request, response, result);
        });
    });
}

let findWorksheet = function (workSheetID, callback, request, response) {// Search By ID
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        var query = { "_id": ObjectId(workSheetID._id) };
        dbo.collection("worksheets").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result[0]);
            console.log(typeof (result));
            db.close();
            var worksheetObj = {
                name: result[0].name,
                author: result[0].author,
                topic: result[0].topic,
                numberList: result[0].numberList
            }
            console.log(worksheetObj, "Inside Function"); //object is ok
            callback(request, response, worksheetObj);
        });
    });
}

let findWorksheetList = function (callback, request, response) { // find all worksheets and return array of worksheets
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        dbo.collection("worksheets").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result));
            db.close();
            console.log("Worksheets Found");
            callback(result, request, response);
        })
    });
}

let storeWorksheet = function (worksheetObj) {
    if (worksheetObj == undefined) {
        throw worksheetObj;
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        var myobj = { name: worksheetObj.name, author: worksheetObj.author, topic: worksheetObj.topic, numberList: worksheetObj.numberList };
        dbo.collection("worksheets").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 worksheet inserted");
            db.close();
            return;
        });
    });
}

let deleteWorksheet = function (renderFuncNoWorksheet, request, response, worksheetID) { // NOT WORKING, wont delete
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        console.log(worksheetID)
        dbo.collection("worksheets").deleteOne({ "_id": ObjectId(worksheetID) }, function (err, obj) {
            if (err) throw err;
            console.log("1 worksheet deleted");
            db.close();
            findWorksheetList(renderFuncNoWorksheet, request, response);
            return;
        });
    });
}

module.exports = {
    findWorksheet: findWorksheet,
    findWorksheetList: findWorksheetList,
    storeWorksheet: storeWorksheet,
    deleteWorksheet: deleteWorksheet,
    findWorksheetBySearch: findWorksheetBySearch
};