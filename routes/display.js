var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('display', { title: 'ANIME DATABASE' });
});


module.exports = router;
