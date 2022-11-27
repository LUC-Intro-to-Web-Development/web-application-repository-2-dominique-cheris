var express = require('express');
var router = express.Router();

var fs = require('fs');
var user = require('../model/user.js');


/* Create User */
router.post('/', function(req, res, next) {

    //Using the data model user from user.js
    user.firstName = req.body.fname;
    user.lastName = req.body.lname;
    user.email = req.body.email;
    user.password = req.body.password;
  
    //outputting user to console to verify that user was created
    console.log(user);
  
    //reading users from user.json file and assigning user to userData variable
    let userData = fs.readFileSync('./users.json');
  
    //The JSON.parse() is converting the string to JS objects
    let siteUsers = JSON.parse(userData);
  
    //Adding the new user to the end of the converted array that was just read in from users.json
    siteUsers.push(user);
  
    /**Now that the user has been added to the array, the JSON.stringify() method converts the JS array
    * into a string so that we can override the users.json file and write the updated array of objects to users.json file
    **/ 
    const userString = JSON.stringify(siteUsers)
    fs.writeFile('./users.json', userString, err => {
        //error handling if, issue arrises with file, else output to successfully wrote file
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
  
    //Render the new user object to display view
    res.render('display', user)

  });

  module.exports = router;

