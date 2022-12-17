const express = require('express');
const app = express();
const dbOperations = require('./database.js');
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');



// DB CONFIGURATION
const db = require('./config/keys').MongoURI;
mongoose.set('strictQuery', true);

// CONNECT TO DATABASE
mongoose.connect(db, { useNewUrlParser: true})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

/**To serve static files such as images, CSS files, and JavaScript files, create a folders
* and include the below statement.  The below statement assumes that I have a folder named assets
**/
app.use(express.static('assets'))
app.use(express.static(__dirname + '/public'));



// view engine setup
app.set("view engine", "hbs");

// parse application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))


// USERS JS
app.use('/users', require('./routes/users'));

// ROUTE TO LOGIN PAGE
app.get('/login',function (req, res) {
 res.render('login')
})

// ROUTE TO REGISTRATION PAGE
app.get('/register',function (req, res) {
  res.render('register')
 })

 app.get('/dashboard',function (req, res) {
  res.render('dashboard')
 })

// ROUTE TO UPDATE PAGE
app.get('/update',function (req, res) {
  res.render('update')
 })

 // ROUTE TO DISPLAY PAGE
app.get('/display',function (req, res) {
  res.render('display')
 })


// ROUTE TO HOME PAGE
app.get('/', function (req, res) {

  dbOperations.getAnime(res);
})


// ROUTE TO CREATE PAGE
app.get('/create', function (req, res) {

  dbOperations.getAnime(res);
})


// ROUTE TO UPDATE PAGE
app.get('/update', function (req, res) {

  dbOperations.getAnime(res);
})


// ROUTE TO CREATE ANIME LIST ITEM
 app.post('/create', function (req, res) {

	// GETTING BODY PARAMETERS
  const {anime_name,release_year,genre,rating,description}= req.body;

  // EXECUTE createItems METHOD
  dbOperations.createItem(anime_name,release_year,genre,rating,description, res);

 })

 // ROUTE TO DELETE ANIME ITEM
 app.post('/delete', function (req, res) {
	// GETTING BODY PARAMETERS
  const {deleterecord}= req.body;
  dbOperations.deleteItem(deleterecord,res);

 })

 // ROUTE TO UPDATE ANIME LIST ITEM
 app.post('/update', function (req, res) {

	// GETTING BODY PARAMETERS
  const {updaterecord} = req.body;
  dbOperations.getAItem(updaterecord,res);
  
 })

 // CREATE A ROUTE FOR CONFIRM UPDATE
 app.post('/confirm_update', function (req, res){
const {animeID,anime_name,release_year,genre,rating,description}= req.body;

var updatedAnimeItem = {animeID,anime_name,release_year,genre,rating,description};
dbOperations.updateItem(updatedAnimeItem,res);
 })
 


     // CREATE A ROUTE TO POST LOGIN
  app.post('/login', function (req, res){
   
  })

 app.listen(port, () => console.log(`Example app listening on port ${port}!`))