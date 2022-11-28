var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET ANIME LISTING. */
router.get('/', function(req, res, next) {

let animeData = fs.readFileSync('./animes.json');
var siteAnime = JSON.parse(animeData);


//Assigning the parsed array of objects read-in from animes.json to a variable called createdAnime
var createdAnime = siteAnime;
res.render('animes', {createdAnime});
});

module.exports = router;