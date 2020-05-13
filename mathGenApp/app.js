var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongo = require('mongodb');
var logger = require('morgan');

//routes
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var reDRouter = require('./routes/redirect');
var homeRouter = require('./routes/home');
var configWorksheetRouter = require('./routes/configWorksheet');
var worksheetRouter = require('./routes/worksheet');
var storeDatatRouter = require('./routes/storeData');
var viewWorksheetsRouter = require('./routes/viewWorksheets');
var scoresRouter = require('./routes/scores');
var myScoresRouter = require('./routes/myScores');
var profileRouter = require('./routes/profile');
var logoutRouter = require('./routes/logout');
var generateWorksheetRouter = require('./routes/generateWorksheet');

var app = express();

// view engine setup Defime where to find views, and view type (handlebars)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "dont_reveal"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', signupRouter);
app.use('/', loginRouter);
app.use('/', reDRouter);
app.use('/', homeRouter);
app.use('/', configWorksheetRouter);
app.use('/', worksheetRouter);
app.use('/', storeDatatRouter);
app.use('/', viewWorksheetsRouter); 
app.use('/', scoresRouter);
app.use('/', myScoresRouter);
app.use('/', profileRouter);
app.use('/', logoutRouter);
app.use('/', generateWorksheetRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;