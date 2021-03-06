var express = require('express');
var config = require.main.require('./config');
var router = express.Router();
var login_path = '/login';

function fj_is_login  (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
		if (req.isAuthenticated()){
			 res.redirect(login_path + '/home');
			 return

		}
		//console.log(login_path);
		
    	// Display the Login page with any flash message, if any
		res.render(config.template+'/login/login_index', { message: req.flash('message') ,header:{title:'yes'}});
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/order/place_order',
		failureRedirect: login_path,
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render(config.template+'/login/login_register',{message: req.flash('message'),header:{title:'yes'}});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/order/place_order',
		failureRedirect: login_path+'/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', fj_is_login, function(req, res){
		res.render(config.template+'/login/login_home', { user: req.user ,header:{title:'yes'}});
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}