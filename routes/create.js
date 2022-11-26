var express = require('express');
const app = require('../app');
var router = express.Router();

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

// GET CREATE PAGE
router.get('/',function(req, res, next) {
res.send('GET request to the home page');
});

router.get('/create',function(req, res, next) {
  res.send('GET request to the home page');
  });

router.post('/create',(req,res) => {
  res.send('POST request to the create page');

});


module.exports = router;

    