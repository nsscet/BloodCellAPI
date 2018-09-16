var mongoose = require('mongoose')
var Schema = mongoose.Schema
var childSchema = new Schema({
    donorId: { type: String },
    name: { type: String },
    bloodGroup: { type: String },
    mobileNumber: { type: Number },
    branch: { type: String },
    yearJoined: { type: Number },
    requirement: { type: String }
})
var requirementSchema = new mongoose.Schema({
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
    contactNo: {
        type: Number,
        required: true
    },
    remarks: {
        type: String
    },
    children: [childSchema]
}, { usePushEach: true })

var Requirement = module.exports = mongoose.model('Requirement', requirementSchema)

module.exports.getRequirements = (query, callback) => {
    console.log(query)
    Requirement.find(query, function(err, requirements) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, requirements)
        }
    })
}

module.exports.addRequirement = (requirement, callback) => {
    var query = {}
    query.hospitalId = requirement.hospitalId
    query.bloodGroup = requirement.bloodGroup
    query.quantity = requirement.quantity
    query.typeOfRequirement = requirement.typeOfRequirement
    query.patientId = requirement.patientId
    query.contactNo = requirement.contactNo
    Requirement.find(query, function(err, requirements) {
        if (requirements.length !== 0) {
            const error = "Duplicate requirement"
            callback(error, null)
        } else
            requirement.save((err) => {
                if (err) {
                    callback(err, null)
                } else {
                    callback(null, requirement)
                }
            })
    })

}
module.exports.updateRequirement = (query, updatedValue, callback) => {
    Requirement.updateOne(query, updatedValue, (err, res) => {
        console.log(err)
        if (err) {
            callback(err)
        } else {
            callback(err)
        }
    })
}
module.exports.linkDonor = (query, value, callback) => {
    Requirement.findOne(query, function(err, requirement) {
        try {

            requirement.children.push(value)
            requirement.save((err) => {
                // console.log(err)
            })

        } catch (error) {
            console.log("Error:" + error)
            callback(error)
        }
        callback(false)
    })


}
module.exports.deLinkDonor = (query, donorId, callback) => {
    Requirement.update(query, { "$pull": { children: donorId } }, callback)
}