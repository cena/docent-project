var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true} },
    password: {type: String, required: true },
    firstname: {type: String, required:true },
    lastname: {type: String, required: true },
    lastlogin: {type: Date, default: Date.now()}
});

UserSchema.pre('save', function(next){
    console.log("Pre is starting");
    var user = this;

    if(!user.isModified('password')) return next;

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        console.log("Prehash");

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            console.log("Password Hashed");
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    console.log("Compare is starting");
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);