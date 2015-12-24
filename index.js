'use strict'

// Set environment to 'development' if it doesn't already have a value
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// Require npm modules
var express = require('express'),
	bodyParser = require('body-parser'),
	mongojs = require('mongojs'),
	morgan = require('morgan'),
	compression = require('compression')
	
// Create Express app
var questionBoard = express()

if(process.env.NODE_ENV === 'production'){
	questionBoard.use(compression())
} else if(process.env.NODE_ENV === 'development'){
	questionBoard.use(morgan('dev'))
}


questionBoard.use(bodyParser.urlencoded({'extended':'true'})) 	 // Only parse urlencoded bodies
questionBoard.use(bodyParser.json())							 // Only parse JSON

// Set Static Server
questionBoard.use(express.static(__dirname + '/public'))

// Connect to MongoDB
var db = mongojs('question-board', ['questions', 'users'])

questionBoard.set('views', './public/views')    // Set views directory
questionBoard.set('view engine', 'ejs')			// Set template engine to EJS

// Require Routes Module
require('./server/routes.js')(questionBoard)

// Set port to env port or 3000 by default
var port = process.env.PORT || 3000
questionBoard.listen(port)

console.log("Server listening on " + port.toString())
