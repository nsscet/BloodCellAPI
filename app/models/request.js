
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var OrganisationSchema = new mongoose.Schema(
  {
      organisationId: {
        type:String,
        required:true
      },
      bloodGroup: {
        type: String,
        required: true
      },
      quantity: {
        type:String,
        required: true
      },
      isClosed: {
        type: Boolean,
        required: true
      },
      timeOfPosting: {
        type: Date,
        required: true
      },
      typeOfRequirement: {
        type: String,
        required: true
      },
      patientId: {
        type: String,
        required: true
      },
  }
)

var User = module.exports = mongoose.model('Organisation' , OrganisationSchema);
