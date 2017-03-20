var debug = require('debug')('MyNodeApp')
    , http = require('http')
    , name = 'My App';
debug("booting app up ...");
//var testMongo= require('./tests/testmongoconnect');
//var nbaPlayerSeedDatabase = require('./scripts/webapi/data/playerDatabase.js');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://localhost:27017/myNodeDb';
// Use connect method to connect to the Server
require('babel-register');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var playerApp = require('./routes/playerAppRoute');
var playerDashBoard = require('./routes/playerDashBoard');
var contact = require('./routes/contact');

var app = express();
// view engine setup
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to database");
    app.locals.db=db;
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/icon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
console.log("static path: " +path.join(__dirname, 'public'));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/contact',contact);
app.use('/playerapp', playerApp);
app.use('/playerdashboard', playerDashBoard);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
