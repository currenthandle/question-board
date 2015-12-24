var mongojs = require('mongojs')
var db = mongojs('question-board', ['questions', 'users'])

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
			
			db.users.insert(req.body)
		})
}
