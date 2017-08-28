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
// var verifyToken = require('./app/middleware/verifyToken')
var setHeaders = require('./app/middleware/setHeaders')

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
  keys: ['nssBl00DCellCeT'],
  // token: 'notavalidtoken',
  cookie: {
    secure: false,
    httpOnly: false,
    // domain: '127.0.0.1:8080',
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
// app.use(passport.session());

//set Headers
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

// console.log(adminRoutes);
app.use('/api' , routes)
app.use('/api/admin' , adminRoutes)
app.get('/login' , function(req, res){
  req.session.token = "somewierdtokenhere"
  res.send(req.session)
})

app.post('/sessiontest' , function(req, res){
  console.log(req.session);
  res.send(req.session)
})

//server
var port = env.PORT || 8080;
app.listen(port)
console.log('API on port ' , port);
