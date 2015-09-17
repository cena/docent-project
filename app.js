
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var emschema = require('./models/embedschema');
var Embed = mongoose.model('Embed', emschema);

//connect mongoose and mongodb

var collection = 'embeds';
var db = mongoose.connect(
    "mongodb://localhost:27017/"+collection,
    function(e) {
        console.log('database connected');
        app.use(cookieParser)
        
        
        app.listen();
        });

var app = express();

var routes = require('./routes/index');
var embeddable = require('./routes/embeds');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var embedactions = require('./resources/actions')
app.get('/', routes);
app.get('/embeds', embedactions.findAll);
app.get('/embeds/:id', embedactions.findById);
app.post('/embeds', embedactions.create);
app.delete('/embeds/:id', embedactions.removeById);
app.put('/embeds/:id', embedactions.update);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
    });*/
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
});


module.exports = app;
