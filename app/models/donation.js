var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Donation = new Schema({
  donorId:{type:String , required:true},
  hospitalId: {type:String , required:true},
  dateOfDonation: {type: String , default: Date.now() , required:true},
  coupouns: {type: [] , default: ['some' , 'sample' , 'coupons']}
})

var Donation = module.exports = mongoose.model('Donation' , Donation);


module.exports.createDonation = function(newDonation , callback){
  newDonation.save(callback);
  }