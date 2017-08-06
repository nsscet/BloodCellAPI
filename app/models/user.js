var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new mongoose.Schema(
  {
    username:String,
    password:String
  }
)

module.exports = mongoose.model('User' , userSchema)
