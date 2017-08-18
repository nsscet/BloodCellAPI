// base setup

//importing packages
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongo = require('mongodb')
var logger = require('morgan')
var mongoose = require('mongoose')
var passport = require('passport');
var jwt = require('jsonwebtoken')

var db = require('./config/db')
var env = require('./env')

mongoose.Promise = global.Promise;


//connecting to db
console.log(env.DB_URL);
mongoose.connect(env.DB_URL , {useMongoClient:true})


//configuration
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(logger('dev'));

//router
var router = require('./routes/routes.js')
router.use(function(req,res,next){
  console.log("Something is happening");
  next();
})

app.use(passport.initialize());
app.use(passport.session());


app.use('/api' , router)

//server
var port = env.PORT || 8080;
app.listen(port)
console.log('API on port ' , port);
