var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs')
// var jwt = require('jsonwebtoken')

var Schema = mongoose.Schema


var UserSchema = new mongoose.Schema(
  {
    username:String,
    password:String
  }
)

passport.use(new LocalStrategy(
  function(username, password, done) {
  // console.log(username);
  process.nextTick(function() {
    User.findOne({
      'username': username,
    },
    function(err, user) {
      // console.log(user);
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, function(err, res) {
        console.log(res);
        if(err) throw err;

        if(res == false){
          return done(null , false);
        }

        if(res == true){
          console.log(user);
          return done(null , user)
        }
      });
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var User = module.exports = mongoose.model('User' , UserSchema);

module.exports.verifyCredentials = function(req, res, next){
  // console.log(req.body);
  passport.authenticate('local' , function(err, user , info){
    console.log("Authenticated");
    if(err)
      return next(err);
    if(!user)
      return res.send({message:"Error authentcating. Username doesnot exist."})

    req.logIn(user , function(err){

      if(err){
        return next(err);
      }
      res.send({"message": user.username + " Authenticated"})
      // console.log(user);
      // var token = jwt.sign(user , 'needstobechanged' , {
      //   expiresInMinutes: 1440
      // })
      // // console.log(token);
      // return res.json({
      //   success:true,
      //   message:"Token genetated",
      //   token: token
      // })
    })
  })(req,res,next)
}

// module.exports.generateToken = function(req, res){
//   console.log("inside generateToken");
//   var token = jwt.sign(req.user , 'needstobechanged' , {
//     expiresInMinutes: 1440
//   })
//   // console.log(req.user);
//   return res.json({
//     success:true,
//     message:"Token genetated",
//     token: token
//   })
// }

module.exports.createUser = function(newUser , callback){
  User.findOne(
    {
      username: newUser.username
    },

    function(err,user){
      // console.log(user);
      if(user){
        console.log("User already exists");
        var message = {message: "User already exists"}
        callback(null , message);
      }

      else
      {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err)
                throw err
            newUser.password = hash;
            newUser.save(callback);
          });
        });
      }
    })
  }
