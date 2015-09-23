var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var User = require('./models/localauth');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local');
//var auth = require('passport-google-oauth');
var flash = require('connect-flash');

//var embed = require('./models/embed');
//var register = require('./routes/register');
var login = require('./routes/login');
var admin = require('./routes/admin');
var embeds = require('./routes/embeds');
var index = require('./routes/index');
var mongo = require('mongodb')
var mongoose = require('mongoose');


var app = express();


app.use(session({
    secret: 'secret',
    key: 'embed',
    resave: true,
    s: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000, secure: false}
}));




app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(passport.initialize());
app.use(passport.session());

//Mongo Setup
var mongoURI = "mongodb://localhost:27017/docentdb";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
    console.log("Mongo Connection Error: ", err);
});

MongoDB.once('open', function(err){
    console.log("Mongo Connection Open")
});

//PASSPORT SESSION
passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err) done(err);
        done(null, user);
    });
});

passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
}, function(req, username, password, done){
    User.findOne({username: username}, function(err, user){
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'Incorrect username and password'})
        }

        user.comparePassword(password, function(err, isMatch){
            if(err) throw err;
            if(isMatch)
                return done(null, user);
            else
                done(null, false, {message: 'Incorrect username and password'});
        });
    });
}));

////////////

app.use(function(req,res, next){

    req.db = mongoURI;
    next();

});

/*app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept');
  // If someone calls with method OPTIONS, display the allowed methods on our API
  if (req.method == 'OPTIONS') {
    res.status(200);
    res.write("Allow: GET,PUT,POST,DELETE,OPTIONS");
    res.end();
  } else {
    next();
  }
})*/;

//app.use('/register', register);
app.use('/login', login);
app.use('/admin', admin);
app.use('/resources', embeds);
app.use('/', index);

app.set("port", (process.env.PORT || 5000));

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;