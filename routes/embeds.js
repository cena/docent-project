
var mongoose = require('mongoose');
var express = require('express');

var router = express.Router();

/* GET resources listing. */
router.get('/embeds', function(req, res, next) {
  res.send('hellos worlds');
});


module.exports = router;
