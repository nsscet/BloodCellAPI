// base setup

//importing packages
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongo = require('mongodb')
var logger = require('morgan')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise;


//connecting to db
mongoose.connect('mongodb://localhost/api')


//configure 
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(logger('dev'));


//router
var router = require('./routes/routes.js')
router.use(function(req,res,next){
  console.log("Something is happening");
  next();
})
app.use('/api' , router)

//server
var port = process.env.port || 8080;
app.listen(port)
console.log('API on port ' , port);
