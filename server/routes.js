'use strict'

var User = require('mongoose').model('User')

// route middleware to ensure user is logged in

function isLoggedIn(req, res, next){
	console.log('req.user', req.user)
	console.log('req.isAuthenticated', req.isAuthenticated())
	if(req.isAuthenticated()) { 
		console.log('in isLoggedIn')
		return next()
	}
	res.redirect('/')
}


module.exports = function(app, passport){ 
	console.log('passport', passport)
	app.route('/')
		.get(function(req, res){
			res.render('index')
		})
	app.get('/signUp', function(req, res){
		res.render('signup')
	})
	
	app.route('/user')
		.get(function(req, res){
		})
		.post(passport.authenticate('local-signup', { successRedirect: '/',
														failureRedirect: 'signup' }))
														
	app.route('/login')
		.get(function(req, res){
			res.render('login')
		})
		.post(passport.authenticate('local-login', { successRedirect: '/',
													failureRedirect: '/login'}), function(req, res){
														console.log('req.user', req.user)	
													})
	app.get('/profile', function(req, res){
		console.log('req.user', req.user)
		res.render('profile', { user: req.user })
	})
	/*	
	app.route('/profile')
		.get(function(req, res){
			
			console.log('req.user', req.user)
			
			if(!req.user){
				res.render('profile', {user: "You're not logged in"})
			}	
			if(req.user){
				res.render('profile', {user: req.user})
			}
		})
		*/
}

