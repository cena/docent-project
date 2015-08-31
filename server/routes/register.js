var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get("/", function (req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/assets/views/register.html'));
});

router.post("/", function (req, res, next){
    console.log("Made it to post! ", req.body);
    Users.create(req.body, function(err, post){
        if(err) next(err);
        else res.redirect("/")
    });
});

module.exports = router;