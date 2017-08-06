// //import mongo from 'mongodb'
// var routes = {}
// export default routes;

var mongo = require('mongodb')
var express = require('express')
var mongoose = require('mongoose')


var User = require('../app/models/user')

// var url = "mongodb://localhost:27017/api"
// mongoose.connect(url)

// var Server = mongo.Server;
// var Db = mongo.Db;
// var BSON = mongo.BSONPure;
//
// var server = new Server('localhost' , 27017 , {auto_reconnect:true})
// var db = new Db('api' , server)

// db.open(function(err,db){
//   if(!err){
//     console.log("Connected to database " + db);
//     db.collection('donation' , {strict:true} , function(err , collection){
//       if(err){
//         console.log("The donation collection doesnot exist... creating it with sample data");
//         // populateDB(); TODO
//       }
//     })
//   }
// })
// db.open(function(err , db){
//   // console.log(db);
//   if(!err){
//     console.log("Connected to database");
//     db.collection('login' , {strict:true} , function(err, collection){
//       // console.log(collection);
//       if (err) {
//         console.log("The 'login' collection doesn't exist. Creating it with sample data...");
//         populateDB();
//       }
//     })
//   }
// })

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
  console.log(user);
  // console.log(user);

  user.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log(user);
    }
  })

})
// router.route('/users').post(function(req,res){
//   var user = new User();
//   user.name = req.body.name;
//   //saving
//   user.save(function(err){
//     if(err){
//       res.send(err);
//     }
//
//     res.json({message: "New item created"});
//   })
// })

module.exports = router;
