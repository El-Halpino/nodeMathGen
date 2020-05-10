var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";
var bcrypt = require('bcryptjs');
//Collection Users

let signup = function (newUser) { // Create New User
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        var userObj = { userName: newUser.userName, email: newUser.email, type: newUser.type, pwd: newUser.hashedPassword };
        dbo.collection("users").insertOne(userObj, function (err, res) {
            if (err) throw err;
            console.log("1 user inserted");
            db.close();
            return;
        });
    });
}

// Signup Validation
let checkUser = function (request, response, user, userIsValid) { // validStatus is sent to userIsValid Function. 
    MongoClient.connect(url, function (err, db) { // False if user is found, True if user does not exist.
        if (err) throw err;
        var dbo = db.db("appDB");
        dbo.collection("users").findOne({ userName: user.userName }, function (err, userFound) {
            if (err) throw err;
            if (userFound) {
                console.log("1 user found");
                validStatus = false;
                userIsValid(request, response, userFound, validStatus)
            } else {
                console.log("user does not exist");
                validStatus = true;
                userIsValid(request, response, false, validStatus);
            }
            db.close();
            return;
        });
    });
}

let findUser = function (request, response, user, checkIfValid) { // For login
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        dbo.collection("users").findOne({ userName: user.userName }, function (err, userFound) {
            if (err) throw err;
            if (userFound) {
                console.log(userFound + ": user found");
                var validStatus = false;
                checkIfValid(request, response, userFound, validStatus)
            } else {
                console.log("user does not exist");
                var validStatus = true;
                checkIfValid(request, response, false, validStatus);
            }
            db.close();
            return;
        });
    });
}

let findUsers = function (request, response, type, callback) { // list of users
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("appDB");
        dbo.collection("users").find({ type: type }).toArray(function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result));
            console.log("Users FOUND, User Type: ", type);
            db.close();
            callback(result, request, response);
        })
    });
}

let checkPassword = async function (request, response, user, password, callback) {
    const match = await bcrypt.compare(password, user.pwd); // Compare password entered with the stored hashed password - returns true if passwords match
    console.log("MATCH Result: ", match);
    callback(request, response, user, match);
}

module.exports = {
    checkPassword: checkPassword,
    checkUser: checkUser,
    signup: signup,
    findUser: findUser,
    findUsers: findUsers
};