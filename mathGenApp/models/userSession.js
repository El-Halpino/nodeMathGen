var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";
//Collection Users

let signup = function (newUser) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        var userObj = { userName: newUser.userName, email: newUser.email, pwd: newUser.hashedPassword };
        dbo.collection("users").insertOne(userObj, function (err, res) {
            if (err) throw err;
            console.log("1 user inserted");
            db.close();
            return;
        });
    });
}

let checkUser = function (request, response, user, userIsValid) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        dbo.collection("users").findOne({ username: user.userName }, function (err, user) {
            if (err) throw err;
            if (user) {
                console.log("1 user found");
                validStatus = false;
                userIsValid(request, response, validStatus)
            } else {
                console.log("user does not exist");
                validStatus = true;
                userIsValid(request, response, validStatus);
            }
            db.close();
            return;
        });
    });
}

let login = function () {

}

module.exports = {
    login: login,
    checkUser: checkUser,
    signup: signup
};