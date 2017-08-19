var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Donation = new Schema({
  id: String,
  donorId:String,
  hospitalId: String,
  dateOfDonation: Date,
  coupouns: {type: [] , default: ['some' , 'sample' , 'coupons']}
})

var Donation = module.exports = mongoose.model('Donation' , Donation);


module.exports.createDonation = function(newDonation , callback){
  console.log(newDonation);
  newDonation.save(callback);
  }
