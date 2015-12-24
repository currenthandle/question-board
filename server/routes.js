'use strict'

var User = require('mongoose').model('User')

module.exports = function(app, passport){ 
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
		.post(function(req, res, next){
			console.log('post route')	
			var newUser = {
				username: req.body.username,
				password: req.body.password,
				questions: [],
				answers: []
			}			
			
			User.create(newUser, function(err){
				if(err) {console.log(err)}
			})
			
			res.redirect('/')
		})
	app.route('/login')
		.get(function(req,res){
			res.render('login')
		})
		.post(passport.authenticate('local', { successRedirect: '/',
												failureRedirect: '/login'}))
}
