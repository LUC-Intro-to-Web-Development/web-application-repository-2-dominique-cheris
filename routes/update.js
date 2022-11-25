var express = require('express');
const app = require('../app');
var router = express.Router();

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

// GET UPDATE PAGE
router.get('/',(req, res)=> {
res.send('GET request to the update page');
});

router.get('/update',(req, res)=> {
    res.send('GET request to the update page');
    });
/*
router.post('/create',(req,res) => {
  res.send('POST request to the create page');

});
*/

module.exports = router;