var express = require('express');
var router = express.Router();


router.get('/users/:id', function (req, res) {
	//Getting id parameter
	var id = req.params.id;
	console.log("Sent as a get request");
	res.render('home', { title: "Routing in Action!", user_id : id})
})

router.get('/testing', function (req, res) {

	res.render( 'index', {title : "Contact Page"})
 })

 router.post('/submit', function (req, res) {
	//Getting body parameters
	var data = req.body;
	var firstName = data.fname;
	var lastName = data.lname;
	var id = data.id;

	console.log("Sent as a post request");
	console.log(firstName + " " + lastName + " " + id );
	res.render( 'index', {title : "Contact Page"})
 })

module.exports = router;