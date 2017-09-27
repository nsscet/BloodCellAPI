var express = require('express')
var router = express.Router();
var User = require('../app/models/user')

// var verifyToken = require('../app/middleware/verifyToken');

router.route('/users')
.get(function(req,res){
  var query = req.query
  User.find(query , function(err, users){
    if(err)
    console.log(err);
    else{
      for(index in users){
        users[index].password = "password"
      }
      res.send({
        users: users.toString(),
        count: users.length
      });
    }
  });
})
.post(function(req , res){
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.role = req.body.role;
  var callback = function(err , message){
    if(err)
    throw err;

    if(message)
    res.send(message)

    if(user){
      res.send({ message, user })
    }
  }
  User.createUser(user , callback);
});

module.exports = router
