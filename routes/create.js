var express = require('express');
//const app = require('../app');
var router = express.Router();


// GET CREATE PAGE
router.get('/',function(req, res, next) {
  res.render('create', {title: 'Create an Anime'})
});

module.exports = router;

    