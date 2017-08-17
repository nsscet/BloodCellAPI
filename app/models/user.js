var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

var Schema = mongoose.Schema


var UserSchema = new mongoose.Schema(
  {
    username:String,
    password:String
  }
)

var User = module.exports = mongoose.model('User' , UserSchema);

module.exports.createUser = function(newUser , callback){

  User.findOne(
    {
      username: newUser.username
    },
    function(err,user){
      if(user){
        console.log("User already exists");
        var message = {message: "User already exists"}
        callback(null , message);
      }
      else{
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
          });
        });
      }
    })
  }

  module.exports.verifyCredentials = function(req, res, next){
    // console.log("Inside verifyCredentials");
    passport.authenticate('local' , function(err, user , info){
      if(err)
        return next(err);
      if(!user)
        return res.send({message:"Error authentcating. Username doesnot exist."})

      req.logIn(user , function(err){
        // console.log(user);
        if(err)
          return next(err);
        var token = jwt.sign(user , 'needstobechanged' , {
          expiresInMinutes: 1440
        })
        // console.log(token);
        return res.json({
                success:true,
                message:"Token genetated",
                token: token
              })
      })

    })
  }

  passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
      User.findOne({
        'username': username,
      },
      function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        bcrypt.compare(password, user.password, function(err, res) {
          if(err) throw err;
          if(res == false){
            return done(null , false);
          }

          if(res === true){

            return done(user , true)
          }
        });
      });
    });
  }));
