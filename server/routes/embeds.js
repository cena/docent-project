var express = require('express');
//var mongoose = require('mongoose');
var router = express.Router();
var resources = require('../models/embed');

router.post('/', function(req, res){
	resources.find({ $text: { $search: req.body.search}}, function(err,item) {
		if (err) {
			res.send({error:err});
		} else {

			res.send(JSON.stringify(item));
		}

	});

});

router.get('/', function(req, res){
	resources.find({}, function(err,docs) {
		if (err) {
			res.send({error:err});
		} else {

		res.json({resources:docs});
	}

	});

});

router.get("/:id", function(req, res, next){
	resources.findById(req.params.id, req.body, function(err, post){
		if(err){
			console.log("ERROR!! : ", err);
		}
		res.json(post);
	});
});

router.delete("/:id", function(req, res, next){
	resources.findByIdAndRemove(req.params.id, req.body, function(err, post){
		if(err){
			console.log("ERROR!! : ", err);
		}
		res.json(post);
	});
});

router.post('/new', function(req, res){
	var newEmbed = new resources({
		embedName: req.body.embedName,
		embedLink: req.body.embedLink,
		logo: req.body.logo,
		howto: req.body.howto,
		description: req.body.description,
		category: req.body.category,
		tags: req.body.tags,
		subject: req.body.subject,
		complete:false});

	newEmbed.save(function(err){
		if(err)console.log("uh-oh...", err);
		res.send(newEmbed.toJSON());
	});

});

module.exports = router;
