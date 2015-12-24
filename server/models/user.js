'use strict'

var mongoose = require('mongoose'),
	Schema = mongoose.Schema
	
var userSchema = new Schema ({
	username: String,
	password: String,
	questions: [String],	// Arrary of question ids
	answers: [String]	 	// Array of answer ids
})

mongoose.model('User', userSchema)
