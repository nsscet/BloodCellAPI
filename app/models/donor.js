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

module.exports.findUserByMobileNumber = function(mobileNumber , callback){
  Donor.findOne(

    {mobileNumber:mobileNumber} ,

    function(err , donor){
    console.log(donor);
    if(err){
      callback(err, null);
    }
    else if (donor) {
      var message = {
        message: "Donor already exists",
        donorId: donor._id
      }
      callback(null , message)
    }
    else{
      var message = {
        message: "New Donor",
        donorId: null
      }
      callback(null , message)
    }
  })
}
