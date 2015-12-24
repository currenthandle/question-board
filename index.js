'use strict'

// Set environment to 'development' if it doesn't already have a value
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// Require modules
var express = require('express'),
	morgan = require('morgan'),
	compression = require('compression'),
	mongoose = require('./mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	bodyParser = require('body-parser')

// Intialize Database
var db = mongoose()


// Create Express app
var app = express()

if(process.env.NODE_ENV === 'production'){
	app.use(compression())
} else if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'))
}


app.use(bodyParser.urlencoded({'extended':'true'})) 	 // Only parse urlencoded bodies
app.use(bodyParser.json())							 // Only parse JSON

app.use(session({secret: "this is the secret"}))	// Secret for hashing cookie
app.use(cookieParser())								// Instatiate cookie-parse
app.use(passport.initialize())						// Intialize passport
app.use(passport.session())							// Initialize session for passport

var User = require('mongoose').model('User')	
// Username and password extracted from cookie
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

// Set Static Server
app.use(express.static(__dirname + '/public'))

app.set('views', './public/views')    // Set views directory
app.set('view engine', 'ejs')			// Set template engine to EJS

// Require Routes Module
require('./server/routes.js')(app)

// Set port to env port or 3000 by default
var port = process.env.PORT || 3000
app.listen(port)

console.log("Server listening on " + port.toString())
