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
// var acl = require('acl')

var db = require('./config/db')
var env = require('./env')

mongoose.Promise = global.Promise;

//connecting to db
var connection = mongoose.connect(env.DB_URL , {useMongoClient:true})

// //configuration of acl
// var acl = new acl(new acl.mongodbBackend(connection));
//
// acl.addUserRoles('nss', 'sadmin')
// acl.allow('sadmin', '*', '*' )
// acl.userRoles('nss', (err, roles) => {
//   console.log("hello");
//   console.log(err);
//   console.log(roles);
// })
// //
// // acl.allow([
// //   {
// //     roles: ['superadmin'],
// //     allows: [
// //       {resources: '*', permissions: '*'}
// //     ]
// //   },
// //   {
// //     roles: ['hospital'],
// //     allows: [
// //       { resources: ['donations' , 'donor'], permissions:'*' }
// //     ]
// //   },
// //   {
// //     roles: ['organisation'],
// //     allows: [
// //       { resources: ['donor'] , permissions: '*' }
// //     ]
// //   }
// // ])
//
// // console.log(acl);

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
var routes = require('./routes')
var adminRoutes = require('./routes/index.js')
var userRoutes = require('./routes/user.js')
var donorRoutes = require('./routes/donor.js')
var donationRoutes = require('./routes/donation.js')


app.use(passport.initialize());

//set Headers
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use('/api' , routes)
app.use('/api/admin' , userRoutes)
app.use('/api/admin' , donorRoutes)
app.use('/api/admin' , donationRoutes)
app.use('/api/admin' , adminRoutes)

//server
var port = env.PORT || 8080;
app.listen(port)
console.log('API on port ' , port);
