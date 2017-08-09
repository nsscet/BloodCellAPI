var express = require('express')
var mongoose = require('mongoose')
var passport = require('passport')


var User = require('../app/models/user')


var router = express.Router();


router.get('/' , function(req , res){
  res.send({ message : "Welcome to Node.js API" });
})

router.get('/users' , function(req,res){
  res.send(User.find());
});

router.post('/users' , function(req , res){
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;

  User.createUser(user , function(err){
    if(err) throw err;
    res.send({message:"User created" , user: user})
  })


  // user.save(function(err){
  //   if(err){
  //     return console.log(err);
  //   }
  //   else{
  //     res.send({message:"User created successfully", "user":user})
  //     console.log("User created successfully");
  //   }
  // })
})

router.post('/login' ,
  passport.authenticate('local' , {
    successRedirect: '/api/loginSuccess',
    failureRediect: '/api/loginFailure'
  }));

router.get('/loginSuccess' , function(req, res, next){
  res.send({message:"Authentication Success"})
})

router.get('/loginFailure' , function(req, res, next){
  res.send({message:"Authentication Failed !!"})
})


module.exports = router;
