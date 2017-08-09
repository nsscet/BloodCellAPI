var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var UserSchema = new mongoose.Schema(
  {
    username:String,
    password:String
  }
)

var User = mongoose.model('User' , UserSchema);

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    User.findOne({
      'username': username,
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));



module.exports = User;
