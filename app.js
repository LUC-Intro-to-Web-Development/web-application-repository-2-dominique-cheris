var createError = require('http-errors');
const dbOperations = require('./database.js');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var createRouter = require('./routes/create');
var addRouter = require('./routes/add');
var displayRouter = require('./routes/display');  
var updateRouter = require('./routes/update');  

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  dbOperations.getAnime(res)

  res.render('index',{
    title: "ANIME DATABASE"
  })
})

app.use('/', indexRouter);
app.use('/display', displayRouter);
app.use('/create', createRouter);
app.use('/add', addRouter);
app.use('/update', updateRouter);

app.post('/add', function (req,res) {
  res.render('index', {title: 'ANIME DATABASE'})

  const {animeID,animeName,releaseYear,genre,rating} = req.body;

  dbOperations.createItem(animeID,animeName,releaseYear,genre,rating);
})

app.post('/delete', function (req,res) {
  res.render('index', {title: 'ANIME DATABASE'})

  const {deleterecord} = req.body;

  dbOperations.deleteItem(deleterecord);
})

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
