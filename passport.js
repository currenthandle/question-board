var LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User')

module.exports = function(passport){
	// Username and password extracted from cookie
	
	passport.use('local-signup', new LocalStrategy(function(username, password, done){
		User.findOne({username: username}, function(err, user){
			if(err) { return done(err) }
			if(user) { return done(null, false) }
			else {
				var newUser = new User()
				newUser.username = username
				newUser.password = newUser.generateHash(password)
				newUser.downloads = []
				newPassword = []
				
				newUser.save(function(err){
					if(err) { throw err }
					return done(null, newUser)
				})
			}
		})	
	}))
	passport.use('local-login', new LocalStrategy(function(username, password, done){
		User.findOne({username: username}, function(err, user){
			if(err) { return done(err) }
			if(!user) { return done(null, false) }
			if(!user.validPassword(password)) { return done(null, false) }
			return done(null, user)
		})	
	}))
	
	passport.serializeUser(function(user, done){
		done(null, user.id)
	})

	passport.deserializeUser(function(user, done){
		User.findById(user._id, function(err, user){
			done(err, user)
		})
	})
}
