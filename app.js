var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
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

//paassport middleware

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
        saveUninitialized: true
  
}))


app.get('*', function(req, res, next)
{


  console.log(req.user)

   res.locals.user= req.user||null;
  
  
  
  
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

//validator middleware
/*app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
*/






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





var app = express();
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

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


        // use passport session
        

// passport config



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
