const express = require('express');
const app = express();
const session = require('express-session');
const dbOperations = require('./database.js');
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const { use } = require('passport');
const localStrategy = require('passport-local').Strategy;
require('dotenv').config();
const User = require('./models/User.js');

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

app.use(session({
  secret:process.env.SESS_PASS,
  resave: false,
  saveUninitialized:true
}));


//////////////////INITIALIZING PASSPORT//////////////////
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
   done(null, user.id);
});

passport.deserializeUser(function(id,done) {
 User.findById(id, function (err, user) {
  done(err,user);
 });
});

passport.use(new localStrategy(function (username,password, done) {
  User.findOne({username: username}, function (err, user) {
    if (err)return done(err);
    if(!user) return done(null,false, {message: 'Incorrect username' });

      bcrypt.compare(password, user.password, function (err,res) {
        if (err)return done(err);

        if(res === false) return done(null, false, {message: 'Incorrect password' });
        return done(null,user);
    });
  });
}));

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
app.use(express.urlencoded({ extended: false }))



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
      username: "admin",
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
    username: 'admin',
    password:'mypassword'
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

     // LOGIN AUTHENTICATE
     app.post('/login', passport.authenticate ('local', {
      successRedirect: '/',
      failureRedirect: 'login?error=true'
     }));


 app.listen(port, () => console.log(`Example app listening on port ${port}!`))