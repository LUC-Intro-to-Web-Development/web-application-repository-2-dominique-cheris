var express = require('express');
const app = require('../app');
var router = express.Router();

router.use((req,res,next) => {
  console.log('Time: ', Date.now())
  next()
})

/* GET users listing. */
router.get('/',(req, res)=> {
res.send('GET request to the home page');
});

router.get('/about',(req, res)=> {
  res.send('GET request to the home page');
  });

//router.post('/about',(req,res) => {
  //res.send('POST request to the home page');

//});


module.exports = router;
