var createError = require('http-errors');
const dbOperations = require('./database.js');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* GET ANIME LISTING. */
router.get('/create', function(req, res) {
    dbOperations.getAllItems(res);


//the statement below contains a render function - the first argument is the view name and the second argument is an object with one key/value pair.
res.render('create', { title: 'ANIME DATABASE' });
});


router.post ('/create', function (req,res) {
    const [animeID,anime_name,release_year,genre] = req.body;
    dbOperations.createItem(res);
})

module.exports = router;
