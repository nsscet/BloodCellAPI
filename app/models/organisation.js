var mongoose = require('mongoose')
var Schema = mongoose.Schema

var OrganisationSchema = new Schema({
  organisationId: {
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  lastUpload: {
    date: {
      type: String
    }
  }
})

var Organisation =  module.exports =mongoose.model('Organisation' , OrganisationSchema);
