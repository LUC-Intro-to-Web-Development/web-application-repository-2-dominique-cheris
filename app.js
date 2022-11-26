var createError = require('http-errors');
const dbOperations = require('./database.js');
var express = require('express');
var path = require('path');
const port = 3000;


//app.use(express.static('public'));

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createRouter = require('./routes/create');
var updateRouter = require('./routes/update');
var listRouter = require('./routes/list');
var deleteRouter = require('./routes/delete');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create', createRouter);
app.use('/update', updateRouter);
app.use('/list', listRouter);
app.use('/delete', deleteRouter);

// GET HOME PAGE
app.get('/', function (req, res) {
	dbOperations.getAnime(res);
	//res.render('index', {title: "Home"})
})

// ROUTE TO CREATE PAGE
app.post('/create', function (req, res) {
	dbOperations.createItem(res);
	//res.render('create', {title: "Create an Anime"})
  const {animeID,anime_name, release_year,genre, rating} =req.body;

  dbOperations.createItem(animeID,anime_name, release_year,genre, rating,res);
})
// ROUTE TO UPDATE PAGE
app.post('/update', function (req, res) {
	dbOperations.updateItem(res);
	res.render('update', {title: "Update an Anime"})
})
// ROUTE TO LIST PAGE
app.post('/list', function (req, res) {
	dbOperations.getAnime(res);
	res.render('list', {title: "List all Anime"})
})

// ROUTE TO DELETE PAGE
app.post('/delete', function (req, res) {
	dbOperations.deleteItem(res);
	res.render('delete', {title: "Delete an Anime"})
})




// ADDING A SESSION FUNCTION
/*
app.use(
  session({
    secret: 'arbitrary-string',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
  })
);
*/



// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



 module.exports = app;

 // app.listen(port, () => console.log(`Example app listening on port ${port}!`))

