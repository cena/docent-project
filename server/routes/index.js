var express = require('express');
var router = express.Router();
var path = require('path');

var passport = require('passport');

router.post("/", passport.authenticate('local', {
    successRedirect: "/assets/views/users.html",
    failureRedirect: "/"
}));

router.get('/create', function(req, res, next){
    console.log("Made it here");
    res.sendFile(path.join(__dirname, "../public/assets/views/another.html"));
});

router.get("/*", function(req, res, next){
    console.log("Hit: ", req.params);
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;