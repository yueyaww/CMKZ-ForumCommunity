var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const NodeCache = require( "node-cache" );
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

const config = require('./config.json');

const myCache = new NodeCache();
global.myCache = myCache;

console.log(config);
mongoose.connect('mongodb://localhost/'+config.dbName,{ useNewUrlParser: true, useCreateIndex: true, 
useNewUrlParser:true,useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(config.dbName+ ' mongoDB已连接 '+ config.ctx);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//请求大小
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(config.ctx+"/upload",express.static(path.join(__dirname, 'upload')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(config.ctx, apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
