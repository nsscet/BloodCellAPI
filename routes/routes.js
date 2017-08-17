var express = require('express')
var mongoose = require('mongoose')
var passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcryptjs')

var User = require('../app/models/user')
var router = express.Router();


router.get('/' , function(req , res){
  res.send({ message : "Welcome to Node.js API" });
})


// '/users' route
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

    if(user)
    res.send({
      message:"User created" , user:user
    })


  }
  User.createUser(user , callback);
});


//login route
router.post('/login' , function(req, res, next){
  User.verifyCredentials(req, res, next);
});

router.get('/loginSuccess' , function(req, res, next){
  res.send({message:"Authentication Success"})
})
router.get('/loginFailure' , function(req, res, next){
  res.send({message:"Authentication Failed !!"})
})


module.exports = router;
