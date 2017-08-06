var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema(
  {
    username:String,
    password:String
  },
  {
    collection: 'login'
  }
)

module.exports = mongoose.model('User' , UserSchema)
