var express = require('express')
var mongoose = require('mongoose')
var passport = require('passport')

var User = require('../app/models/user')
var verifyToken = require('../app/middleware/verifyToken');
var router = express.Router();

router.get('/' , function(req , res){
  console.log(req.session);
  res.send({ message : "Welcome to Node.js API" });
})

//REST Routes

// resource 'users'
router.route('/users')
.get(function(req,res){
  User.find({} , function(err, users){
    if(err)
    console.log(err);
    else{
      res.send(users.toString());
    }
  });
})
.post(function(req , res){
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  var callback = function(err , message){
    if(err)
    throw err;

    if(message)
    res.send(message)

    if(user){
      res.send({
        message:"User created" , user:user
      })
    }
  }
  User.createUser(user , callback);
});



// Other Routes

//login route
router.post('/login' , function(req, res, next){
  User.verifyCredentials(req, res, next);
});

//to check if username is valid
router.post('/isValidUsername' , function(req , res){
  var username = req.body.username;
  var callback = function(err, message){
    if(err)
    throw err;
    if(message)
    res.send(message)
  }
  User.findUserByUsername(username , callback)
})

router.get('/logout' , function(req, res){
  req.session.accessToken = null;
  res.send({
    message: "The user was successfully logged out"
  })
})

module.exports = router;
