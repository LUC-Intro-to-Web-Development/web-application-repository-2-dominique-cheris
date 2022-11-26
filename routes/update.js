var express = require('express');
var router = express.Router();

// GET UPDATE PAGE
router.get('/',(req, res)=> {
  res.render('update', {title: 'Update an Anime'})
});

module.exports = router;