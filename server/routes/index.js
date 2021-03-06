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


router.post("/", passport.authenticate('local', {
    successRedirect: "/assets/views/admin.html",
    failureRedirect: "/"
}));


router.get("/*", function(req, res, next){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;