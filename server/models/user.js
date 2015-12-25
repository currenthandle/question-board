'use strict'

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt')
	
var userSchema = new Schema ({
	username: String,
	password: String,
	questions: [String],	// Arrary of question ids
	answers: [String]	 	// Array of answer ids
})

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9))
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password)
}

mongoose.model('User', userSchema)
