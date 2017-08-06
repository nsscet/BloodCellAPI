// base setup

//importing packages
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongo = require('mongodb')
var logger = require('morgan')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

var router = require('./routes/routes.js')

//connecting to db
var url = "mongodb://localhost:27017/api"


var connection = mongoose.createConnection(url, {auto_reconnect:true})
connection.on('error', console.error.bind(console, 'connection error:'));


//configure bodyParser
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(logger('dev'));

var port = process.env.port || 8080;

//router

app.use('/api' , router)


app.listen(port)

console.log('API on port ' , port);
