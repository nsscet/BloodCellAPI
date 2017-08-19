var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var DonorSchema = new Schema({
  name: String,
  mobileNumber: Number,
  place: String,
  email: String
})

var Donor = module.exports = mongoose.model('Donor' , DonorSchema);

module.exports.createDonor = function(newDonor , callback){
  newDonor.save(callback)
}
