'use strict'

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


module.exports = function(){
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

	// Set Static Server
	app.use(express.static(__dirname + '/public'))

	app.set('views', './public/views')    // Set views directory
	app.set('view engine', 'ejs')			// Set template engine to EJS
	
	// Require Passport Configuration
	require('./passport')(passport)
	
	// Require Routes Module
	require('./server/routes.js')(app, passport)
	
	return app;
}
