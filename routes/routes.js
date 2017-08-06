var mongo = require('mongodb')
var express = require('express')
var mongoose = require('mongoose')


var User = require('../app/models/user')


var router = express.Router();

router.use(function(req,res,next){
  console.log("Something is happening");
  next();
})


router.get('/' , function(req , res){
  res.json({ message : "Welcome to Node.js API" });
})

router.post('/users' , function(req , res){
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.save(function(err){
    if(err){
      return console.log(err);
    }
    else{
      console.log("User created successfully");
    }
  })


})


module.exports = router;
