var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// collection scores

let updateScore = function (request, response, teacher, score, worksheetName, userName, renderResultsFunc) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log(teacher, score, worksheetName, userName )
        var dbo = db.db("appDB");
        var myquery = { teacher: teacher, worksheetName: worksheetName, userName: userName };
        var newScore = {$set:  {"score": score}};
        dbo.collection("scores").updateOne(myquery, newScore, function (err, res) {
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

let findScores = function (worksheetName, teacher) {

}

module.exports = {
    saveScore: saveScore,
    checkScore: checkScore,
    findScores: findScores
};