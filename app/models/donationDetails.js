var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var DonorSchema = new Schema({
  id: String,
  donorId:String,
  hospitalId: String,
  dateOfDonation: Date,
  coupouns: {type: [] , default: ['some' , 'sample' , 'coupons']}
})

var Donor = module.exports = mongoose.model('Donor' , DonorSchema);
