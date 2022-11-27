var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

//the statement below contains a render function - the first argument is the view name and the second argument is an object with one key/value pair.
res.render('create', { title: 'Create Account'})
});

module.exports = router;
