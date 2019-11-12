var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require ('mongoose');
mongoose.connect('mongodb://Kanch:f5TPESTtzxcp5TPm@taazabazaar-shard-00-00-mnk0t.gcp.mongodb.net:27017,taazabazaar-shard-00-01-mnk0t.gcp.mongodb.net:27017,taazabazaar-shard-00-02-mnk0t.gcp.mongodb.net:27017/test?ssl=true&replicaSet=taazabazaar-shard-0&authSource=admin&retryWrites=true&w=majority', {dbName:'taazabazaar'})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);





/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Kanch:<funny???>@taazabazaar-mnk0t.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/


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
