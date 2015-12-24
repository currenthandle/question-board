var LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User')

module.exports = function(passport){
	// Username and password extracted from cookie
	passport.use(new LocalStrategy(function(username, password, done){
		console.log("new LocalStrategy")
		User.findOne({username: username, password: password}, function(err, user){
			if(err) { return done(err) }
			if(!user) { return done(null, false)}
			return done(null, user)
		})	
	}))
	passport.serializeUser(function(user, done){
		console.log('seralizeUser')
		done(null, user)
	})

	passport.deserializeUser(function(user, done){
		console.log('deseralizeUser')
		User.findById(user._id, function(err, user){
			done(err, user)
		})
	})
}
