// //import mongo from 'mongodb'
// var routes = {}
// export default routes;

var mongo = require('mongodb')
var express = require('express')

var Bear = require('../app/models/bear')


var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('localhost' , 27017 , {auto_reconnect:true})
var db = new Db('api' , server)

db.open(function(err,db){
  if(!err){
    console.log("Connected to database");
    db.collection('donation' , {strict:true} , function(err , collection){
      if(err){
        console.log("The donor collection doesnot exist... creating it with sample data");
        // populateDB(); TODO
      }
    })
  }
})

var router = express.Router();

router.use(function(req,res,next){
  console.log("Something is happening");
  next();
})


router.get('/' , function(req , res){
  res.json({ message : "Welcome to Node.js API" });
})


router.route('/bears').post(function(req,res){
  var bear = new Bear();
  bear.name = req.body.name;
  //saving
  bear.save(function(err){
    if(err){
      res.send(err);
    }

    res.json({message: "New item created"});
  })
})


module.exports = router;
