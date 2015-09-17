var mongoose = require('mongoose');
var express = require('express');

var Schema = mongoose.Schema;

var embedSchema = new Schema({

	embedName: String,
	embedLink: String,
	howto: String,
	description: String,
	category: String,
	tags: Array,
	subject: String

});
