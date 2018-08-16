
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var requirementSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: String,
      required: true
    },
    bloodGroup: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    isClosed: {
      type: Number,
      default: 0
    },
    timeOfPosting: {
      type: Date,
      default: Date.now()
    },
    typeOfRequirement: {
      type: String,
      required: true
    },
    patientId: {
      type: String,
      required: true
    },
    contactNo:{
      type:Number,
      required: true
    },
    remarks:{
      type:String
    }
  }
)

var Requirement = module.exports = mongoose.model('Requirement', requirementSchema)

module.exports.getRequirements = (query, callback) => {
  Requirement.find(query, function (err, requirements) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, requirements)
    }
  })
}

module.exports.addRequirement = (requirement, callback) => {
  requirement.save((err) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, requirement)
    }
  })
}
module.exports.updateRequirement = (query, updatedValue, callback) => {
  Requirement.updateOne(query, updatedValue, (err, res) => {
    if (err) {
      callback(err)
    } else {
      callback(err)
    }
  })
}
