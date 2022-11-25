var express = require('express');
const app = require('../app');
var router = express.Router();

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

// GET DELETE PAGE
router.get('/',(req, res)=> {
res.send('GET request to the home page');
});

router.get('/delete',(req, res)=> {
    res.send('GET request to the delete page');
    });
/*
router.post('/create',(req,res) => {
  res.send('POST request to the create page');

});
*/

module.exports = router;

    