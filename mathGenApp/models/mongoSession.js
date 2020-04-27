var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";


let findWorksheet = function (workSheetID, renderFuncNoWorksheet) {
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
            renderFuncNoWorksheet(worksheetObj);
        });
    });
}

module.exports = {
    findWorksheet: findWorksheet
};