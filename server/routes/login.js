var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/localauth');

router.get("/", function (req, res, next){
    res.sendFile(path.join(__dirname, '../public/assets/views/login.html'));
});


router.post('/',
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/'
    })
);

//router.post("/", function (req, res, next){
//    console.log("Made it to post! ", req.body);
//    Users.create(req.body, function(err, post){
//        if(err) next(err);
//        else res.redirect("/admin")
//    });
//});

module.exports = router;