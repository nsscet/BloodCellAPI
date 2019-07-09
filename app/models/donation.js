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
var Donation = new Schema({
    donorId: {
        type: String,
        required: true
    },
    hospitalId: {
        type: String,
        required: true
    },
    dateOfDonation: {
        type: String,
        default: Date.now(),
        required: true
    },
    typeOfDonation: {
        type: String,
        required: true
    },
    voluntary: {
        type: Boolean,
        required: true
    },
    donor: childSchema,
    coupouns: {
        type: [],
        default: ['some', 'sample', 'coupons']
    }
})

var Donation = module.exports = mongoose.model('Donation', Donation)

module.exports.createDonation = function(newDonation, callback) {
    newDonation.save((err) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, newDonation)
        }
    })
}

module.exports.getDonations = function(query, callback) {
    Donation.find(query, function(err, donors) {
        if (err) { return callback(err, null) } else {
            let message = {
                count: donors.length,
                donors,
                success: true
            }
            callback(null, message)
        }
    })
}