var express = require('express');
var router = express.Router();

// LOGIN PAGE
router.get('/login', function(req, res, next) {
  res.render('Login');
});

// REGISTER
router.get('/register', function(req, res, next) {
    res.render('Register');
  });

module.exports = router;