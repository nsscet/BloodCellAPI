// base setup

//importing packages
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var mongo = require('mongodb')
var logger = require('morgan')
var mongoose = require('mongoose')
var passport = require('passport');
var jwt = require('jsonwebtoken')
var cors = require('cors')
var helmet = require('helmet')
var session = require('cookie-session')

var db = require('./config/db')
var env = require('./env')

mongoose.Promise = global.Promise;

//connecting to db
mongoose.connect(env.DB_URL , {useMongoClient:true})

//configuration
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger('dev'));
app.use(helmet())

var expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
app.use(session({
  name:'token',
  keys: [env.COOKIE_KEY],
  cookie: {
    secure: false,
    httpOnly: true,
    path: '/',
    expires: expiryDate
  }
}))

//router
var routes = require('./routes/routes.js')
var adminRoutes = require('./routes/admin.js')
routes.use(function(req,res,next){
  console.log(req.session);
  console.log("Something is happening");
  next();
})

app.use(passport.initialize());

//set Headers
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use('/api' , routes)
app.use('/api/admin' , adminRoutes)

//server
var port = env.PORT || 8080;
app.listen(port)
console.log('API on port ' , port);
