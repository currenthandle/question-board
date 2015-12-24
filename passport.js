module.exports = function(){
	passport.use(new LocalStrategy(function(username, password, done){
		User.findOne({username: username, password: password}, function(err, user){
			if(err) { return done(err) }
			if(!user) { return done(null, false)}
			return done(null, user)
		})	
	}))
	passport.serializeUser(function(user, done){
		done(null, user)
	})

	passport.deserializeUser(function(user, done){
		User.findById(user._id, function(err, user){
			done(err, user)
		})
	})
	app.post('/login',
		passport.authenticate('local', { successRedirect: '/',
									   failureRedirect: '/login',
									   failureFlash: true })
	)
	app.get('/login', function(req,res){
		res.render('login')
	})
}
