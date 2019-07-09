var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Hospital = new Schema({
    name: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: Number,
        unique: true,
        required: true
    }
})

var hospital = module.exports = mongoose.model('Hospital', Hospital)

module.exports.getHospitals = (query, callback) => {
    hospital.find(query, function(err, hospitals) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, hospitals)
        }
    })
}
module.exports.createHospital = (newHospital, callback) => {
    newHospital.save((err) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, newHospital)
        }
    })
}