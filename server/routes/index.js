var express = require('express');
var router = express.Router();
var path = require('path');

var passport = require('passport');

var resource = require('../../dao/resources');

/*
 * ROUTES
 */

 router.get('/resources', resource.getAll);
 router.get('/resource/:id', resource.getOne);
 router.post('/resource/', resource.create);
 router.put('/resource/:id', resource.update);
 router.delete('/resource/:id', resource.delete);




/*router.post("/", passport.authenticate('local', {
    successRedirect: "/assets/views/embeds.html",
    failureRedirect: "/"
}));

router.get('/create', function(req, res, next){
    console.log("Made it here");
    res.sendFile(path.join(__dirname, "../public/assets/views/another.html"));
});*/

router.get("/*", function(req, res, next){
    console.log("Hit: ", req.params);
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;