var express = require('express');
var router = express.Router();



// GET DELETE PAGE
router.get('/',function(req, res, next) {
  res.render('delete', {title: 'Delete an Anime'})
});

module.exports = router;


    