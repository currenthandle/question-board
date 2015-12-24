'use strict'

var mongoose = require('mongoose')

module.exports = function(){
	var db = mongoose.connect('mongodb://localhost/question-board')
	
	require('./server/models/user')
	
	return db
}
