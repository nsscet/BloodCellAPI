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
var cors = require('cors')

var db = require('./config/db')
var env = require('./env')
// var verifyToken = require('./app/middleware/verifyToken')
var setHeaders = require('./app/middleware/setHeaders')

mongoose.Promise = global.Promise;


//connecting to db
mongoose.connect(env.DB_URL , {useMongoClient:true})


//configuration
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger('dev'));

//router
var routes = require('./routes/routes.js')
var adminRoutes = require('./routes/admin.js')
routes.use(function(req,res,next){
  console.log("Something is happening");
  next();
})

app.use(passport.initialize());
app.use(passport.session());

//set Headers
app.use(cors());

// console.log(adminRoutes);
app.use('/api' , routes)
app.use('/api/admin' , adminRoutes)

//server
var port = env.PORT || 8080;
app.listen(port)
console.log('API on port ' , port);
