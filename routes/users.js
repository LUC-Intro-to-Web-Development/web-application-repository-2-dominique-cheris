var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');


// TUTORIAL

router.use((req, res, next) => {
  console.log('Request made to /users route')
next();
});

// LOGIN PAGE
router.get('/login', function(req, res, next) {
  res.render('Login');
});

// REGISTER
router.get('/register', function(req, res, next) {
    res.render('register');
  });
  

   // REGISTER HANDLE
   router.post('/', [
    check('name').notEmpty,
    check('email').notEmpty,
    check('password').notEmpty,
    check('password2').notEmpty,

   ],(req,res)=>{

    let errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()) {

    }
    
    const {name,email, password, password2} = req.body;
  

  // CHECK REGISTER FIELDS
  if(!name || !email || !password || !password2) {
    errors.push({msg: 'Please fill in all fields'});
  }

    // CHECK PASSWORDS MATCH
    if(password !== password2) {
      errors.push({msg: 'Passwords do not match'});
    }

    // PASSWORD LENGTH
    if(password.length < 8) {
      errors.push({msg: 'Password must be at least 8 characters'});
    }
if(errors.length > 0) {
  res.render('register', {
    errors,
    name,
    email,
    password,
    password2
  });
}else {
    res.send('pass');
  }


  });

module.exports = router;