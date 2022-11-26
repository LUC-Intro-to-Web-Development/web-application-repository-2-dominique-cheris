var express = require('express');
var router = express.Router();


// GET LIST PAGE
router.get('/', function(req, res, next) {
  res.render('list', { title: 'ANIME LIST' });
});

module.exports = router;
