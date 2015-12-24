'use strict'

var User = require('mongoose').model('User')

module.exports = function(q){ // Calling the app 'q' for questionBoard
	q.route('/')
		.get(function(req, res){
			res.render('index')
		})
	q.get('/signUp', function(req, res){
		res.render('signup')
	})
	q.route('/user')
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
}
