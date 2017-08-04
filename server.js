// base setup

//importing packages
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongo = require('mongodb')

//connecting to db
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/api"

MongoClient.connect(url , function(err , db){
  if(err) throw err;
  console.log("database created");
  db.close()
})

//configure bodyParser
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

var port = process.env.port || 8080;


var Bear = require('./app/models/bear')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/api')

//router
var router = express.Router();

router.use(function(req,res,next){
  console.log("Something is happening");
  next();
})


router.get('/' , function(req , res){
  res.json({ message : "Welcome to Node.js API" });
})

app.use('/api' , router)

app.listen(port)

console.log('API on port ' , port);
