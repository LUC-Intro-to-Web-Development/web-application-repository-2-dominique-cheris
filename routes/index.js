var express = require('express');
var router = express.Router();

// adding port
const port = 8080;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
