var express = require('express');
const app = require('../app');
var router = express.Router();

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

// GET LIST PAGE
router.get('/',(req, res)=> {
res.send('GET request to the list page');
});

router.get('/list',(req, res)=> {
    res.send('GET request to the list page');
    });
/*
router.post('/create',(req,res) => {
  res.send('POST request to the create page');

});
*/

module.exports = router;