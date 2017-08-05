// base setup

//importing packages
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongo = require('mongodb')
var logger = require('morgan')
var router = require('./routes/routes.js')

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
app.use(logger('dev'));

var port = process.env.port || 8080;


var Bear = require('./app/models/bear')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/api')

//router

app.use('/api' , router)


app.listen(port)

console.log('API on port ' , port);
