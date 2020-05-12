var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// collection - scores

let updateScore = async function (request, response, teacher, score, worksheetName, userName, renderResultsFunc) {
    MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        console.log(teacher, score, worksheetName, userName)
        var dbo = db.db("appDB");
        var myquery = { "teacher": teacher, "worksheetName": worksheetName, "userName": userName };
        dbo.collection("scores").updateOne(myquery, { $set: { score: score } }, function (err, res) {
            if (err) throw err;
            console.log("1 score updated");
            db.close();
            renderResultsFunc(request, response, false); // Set to false "Don't Save Score" Already Updated
            return;
        });
    });
}

let checkScore = function (request, response, teacher, score, worksheetName, userName, renderResultsFunc) { // Prevent overwriting
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        var query = { teacher: teacher, worksheetName: worksheetName, userName: userName };
        dbo.collection("scores").findOne(query, function (err, result) {
            if (err) throw err;
            if (result == null || result == undefined) {
                console.log("Save the Score");
                var saveTheScore = true;
                renderResultsFunc(request, response, saveTheScore);
            }
            else if (score > result.score && result.score != undefined) {
                console.log("Update the Score");
                updateScore(request, response, score, teacher, worksheetName, userName, renderResultsFunc); // New score is greater than stored score, Update Score
            } else if (score <= result.score) {
                console.log("Don't save the score");
                var saveTheScore = false;
                renderResultsFunc(request, response, saveTheScore);
            } else { // there isn't a score
                console.log("Save the Score");
                var saveTheScore = true;
                renderResultsFunc(request, response, saveTheScore);
            }
            db.close();
            return;
        });
    });
}

let saveScore = function (teacher, score, worksheetName, userName) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        var myobj = { teacher: teacher, worksheetName: worksheetName, userName: userName, score: score };
        dbo.collection("scores").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 score inserted");
            db.close();
            return;
        });
    });
}

let findScores = function (request, response, teacher, worksheetName, callback) { // list of scores filtered for specified teacher and worksheetName
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        dbo.collection("scores").find({ worksheetName: worksheetName, teacher: teacher }).toArray(function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result));
            console.log("SCORES FOUND");
            db.close();
            callback(result, request, response);
        })
    });
}

let findMyScore = function (response, studentName, callback) {//find current users scores
    if (studentName == undefined) {
        throw studentName;
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        dbo.collection("scores").find({ userName: studentName.userName }).toArray(function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result));
            console.log("SCORES FOUND");
            db.close();
            callback(response, result, studentName);
        })
    });
}

module.exports = {
    saveScore: saveScore,
    checkScore: checkScore,
    findScores: findScores,
    findMyScore: findMyScore
};