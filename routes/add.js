var express = require('express');
var router = express.Router();

var fs = require('fs');
var anime = require('../model/anime.js');


/* Create animes */
router.post('/', function(req, res, next) {

    //Using the data model anime from anime.js
    anime.animeID = req.body.animeID;
    anime.animeName = req.body.animeName;
    anime.releaseYear = req.body.releaseYear;
    anime.genre = req.body.genre;
    anime.rating = req.body.rating;
  
    //outputting anime to console to verify that anime was created
    console.log(anime);
  
    //reading anime from animes.json file and assigning anime to animeData variable
    let animeData = fs.readFileSync('./animes.json');
  
    //The JSON.parse() is converting the string to JS objects
    let siteAnimes = JSON.parse(animeData);
  
    //Adding the new anime to the end of the converted array that was just read in from animes.json
    siteAnimes.push(anime);
  
    /**Now that the anime has been added to the array, the JSON.stringify() method converts the JS array
    * into a string so that we can override the animes.json file and write the updated array of objects to animes.json file
    **/ 
    const animeString = JSON.stringify(siteAnimes)
    fs.writeFile('./animes.json', animeString, err => {
        //error handling if, issue arrises with file, else output to successfully wrote file
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
  
    //Render the new anime object to display view
    res.render('update', anime)

  });

  module.exports = router;

