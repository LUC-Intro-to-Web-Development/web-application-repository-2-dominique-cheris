const { application } = require('express');
var express = require('express');
var router = express.Router();

// ADDING PORT
const port = 8080;

// CREATING FUNCTION FOR APP
app.use('/home', (req, res, next) => {
  console.log('A new request recieved at');
  next();
});

app.get('/home', (req, res,) => {
  res.send('Home Page');
});
/* 
GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
*/

  // ADDITIONAL ROUTE PATHS
  /*
  app.get('/home', (req, res) => {
    res.send('Home Page');
  });
  app.get('/about', (req, res) => {
    res.send('About');
  });
  */

  // ROUTING PARAMETER TEMPLATE. 
  /*
  app.get('/books/:bookId', (req, res) => {
    res.send(req.params);
  });

  // FOR INVALID ROUTES
app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});
  */

  // ADDING ROUTE METHOD TEMPLATE
//app.METHOD(PATH, HANDLER);



module.exports = router;

  // ADDING PORT LISTENER 
  app.listen(8080, () => console.log('Example app listening on port 8080'));



