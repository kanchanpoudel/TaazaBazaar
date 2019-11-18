var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
var MongoStore = require("mongo-store")

const passport= require('passport');
const { check, validationResult } = require('express-validator');

var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require ('mongoose');
const config = require('./config/database');
mongoose.connect(config.database);







//mongoose.connect('mongodb://localhost/taazabazaar')
//mongoose.connect('mongodb://Kanch:f5TPESTtzxcp5TPm@taazabazaar-shard-00-00-mnk0t.gcp.mongodb.net:27017,taazabazaar-shard-00-01-mnk0t.gcp.mongodb.net:27017,taazabazaar-shard-00-02-mnk0t.gcp.mongodb.net:27017/test?ssl=true&replicaSet=taazabazaar-shard-0&authSource=admin&retryWrites=true&w=majority', {dbName:'taazabazaar'})

var app = express();
var session = require("express-session"),
    bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(cookieParser('secrettexthere'));
app.use(session({ secret: 'secrettexthere',
  saveUninitialized: true,
  resave: true,
  
  // using store session on MongoDB using express-session + connect
  }));

app.set('trust proxy', 1)

app.use(passport.initialize());
app.use(passport.session());
// Add the line below, which you're missing:
require('./config/passport')(passport);
app.use(bodyParser.urlencoded({ extended: false }));


passport.serializeUser(function(user, done) {
    console.log('in serializeer')
  done(null, user.id);
});
passport.deserializeUser(function(user, done) {
  console.log("in the deserialize")
    done(null, user);
});
//paassport middleware

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.get('*', function(req, res,next)
{
  user=req.user||null
   console.log(user );
   next()
})


app.use('/', indexRouter);
app.use('/users', usersRouter);

//session middleware




//messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});








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
