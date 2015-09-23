var express = require('express');
var router = express.Router();
//var passport = require('passport');
var path = require('path');
//var Users = require('../models/user');

router.get("/", function (req, res, next){

	var file = req.params[0] || "/assets/views/admin.html";
    res.sendFile(path.join(__dirname, "../public", file));
    //res.sendFile(path.join(__dirname, '../public/assets/views/admin.html'));
});

/*router.post("/", function (req, res, next){
    console.log("Made it to post! ", req.body);
    Users.create(req.body, function(err, post){
        if(err) next(err);
        else res.redirect("/")
    });
});
*/
module.exports = router;