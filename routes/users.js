var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET users listing. */
router.get('/', function(req, res, next) {

let userData = fs.readFileSync('./users.json');
var siteAnime = JSON.parse(userData);


//Assigning the parsed array of objects read-in from users.json to a variable called createdAnime
var createdAnime = siteAnime;
res.render('users', {createdAnime});
});

module.exports = router;