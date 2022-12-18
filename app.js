const express = require('express');
const app = express();
const session = require('express-session');
const dbOperations = require('./database.js');
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
require('dotenv').config();


// CONNECT TO DATABASE
mongoose.set("strictQuery", true);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qe67sb8.mongodb.net/?retryWrites=true&w=majority/Anime Database`,(err)=>{

if(err) throw err;
console.log("DB Connected Successfully");
})


/**To serve static files such as images, CSS files, and JavaScript files, create a folders
* and include the below statement.  The below statement assumes that I have a folder named assets
**/
app.use(express.static('assets'))
app.use(express.static(__dirname + '/public'));



// VIEW ENGINE
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