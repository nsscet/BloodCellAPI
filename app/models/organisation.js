
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var OrganisationSchema = new mongoose.Schema(
  {
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
  }
)

var User = module.exports = mongoose.model('Organisation' , OrganisationSchema);
