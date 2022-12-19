const express = require('express');
const app = express();
const session = require('express-session');
const dbOperations = require('./database.js');
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User.js');
var authRouter = require('./routes/auth');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const { db } = require('./models/User.js');

// CONNECT TO DATABASE
mongoose.set("strictQuery", true);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qe67sb8.mongodb.net/animedatabase?retryWrites=true&w=majority`,(err)=>{
if(err) throw err;
console.log("Mongoose Connected Successfully")
});



/**To serve static files such as images, CSS files, and JavaScript files, create a folders
* and include the below statement.  The below statement assumes that I have a folder named assets
**/
app.use(express.static('assets'))
app.use(express.static(__dirname + '/public'));


app.use('/', authRouter);

app.use(session({
  secret: 'process.env.SESS_PASS',
  resave: false,
  saveUninitialized:false,
  store: MongoStore.create({mongoUrl:`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qe67sb8.mongodb.net/animedatabase?retryWrites=true&w=majority`})
}));
app.use(passport.authenticate('session'));


// REDIRECT TO LOGIN PAGE
function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function isLoggedOut(req,res,next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/');
}

// VIEW ENGINE
app.set("view engine", "hbs");

// parse application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))



//////////////////ROUTES//////////////////


// SETUP ADMIN USER
app.get('/setup', async (req,res) => {
  const exists = await User.exists({ username: "admin"});

  if (exists) {
    res.redirect('/login');
    return;
  };
bcrypt.genSalt(10, function (err, salt) {
  if (err) return next(err);
  bcrypt.hash('mypassword', salt, function (err,hash) {
    if (err) return next(err);
    const newAdmin = new User ({
      username: "",
      password: hash
    });
  
    newAdmin.save();
    res.redirect('/login');
  });
});
});

// LOGIN / LOGOUT ROUTES
app.get('/login',isLoggedIn, (req, res) =>{
  res.render('login')
 })

 app.get('/',isLoggedOut,(req, res) =>{
  res.render('login')
 })

 app.get('logout', function (req,res) {
  req.logout();
  res.redirect('/');
 });

// ROUTE TO LOGIN PAGE
app.get('/login',function (req, res) {
 res.render('login')
})

// ROUTE TO REGISTER PAGE
app.get('/register',function (req, res) {
  res.render('register')
 })

 // ROUTE TO DASHBOARD PAGE
app.get('/',function (req, res) {
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
app.get('/home', function (req, res) {

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


// MONGOOSE ROUTES
app.get ('/add-user', (req,res)=> {
  const user = new User({
    username:'',
    password:''
  });

  user.save()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err);
});
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

   // CREATE A ROUTE TO POST REGISTER
   app.post('/register', function (req, res){
   
   })

    // CREATE A ROUTE TO DASHBOARD REGISTER
    app.post('/dashboard', function (req, res){
   
    })

      // CREATE A ROUTE TO DASHBOARD REGISTER
     app.post ('/confirm_user', function (req, res){
        const {username,password}= req.body;
        var updatedUser = {username,password};
        db.Users('users').insertOne({username,password})
      })

      app.listen(process.env.PORT || 3000);
