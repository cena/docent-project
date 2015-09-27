var express = require('express');
//var mongoose = require('mongoose');
var router = express.Router();
var resources = require('../models/embed');


router.put("/edits/:id", function(req, res, next){

	resources.findByIdAndUpdate(req.params.id, req.body, function(err, post){
		return resources.find({}).exec(function(err, resource){
			if(err) throw new Error(err);
			res.send(resource);
		});
		if(err){
			console.log("ERROR!! : ", err);
		}
		res.json(post);
		console.log("this is the post param for put call: ", post);
	});
});

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

/*router.get('/', function(req, res, next) {
    res.json(req.isAuthenticated());
});

router.get('/name', function(req, res, next){
    res.json(req.user);
});

router.put("/id", function(req,res,next){
    User.findByIdAndUpdate(req.user.id, {lastlogin: Date.now()}, function(){
        console.log("User Updated!");
    });

    res.json(req.user);
});*/

module.exports = router;
