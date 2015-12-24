'use strict'

// Set environment to 'development' if it doesn't already have a value
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// Require modules
var express = require('./express'),
	mongoose = require('./mongoose')

// Intialize Database
var db = mongoose()

// Create Express app
var app = express()

// Set port to env port or 3000 by default
var port = process.env.PORT || 3000
app.listen(port)

console.log("Server listening on " + port.toString())
