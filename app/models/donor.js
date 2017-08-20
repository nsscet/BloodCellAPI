var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var DonorSchema = new Schema({
  name: {type:String , required:true},
  mobileNumber: {type:Number , unique:true},
  place: {type:String , required:true},
  email: {type:String , unique:true}
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

module.exports.findUserByUsername = function(username , callback){
    Donor.findOne(
            {username: username},
            function(err , donor){
                if(err)
                    callback(err , null)
                else if(donor){
                    var message = {
                        message:"Donor exists",
                        donorId: donor._id
                    }
                    callback(null , message)
                }
                else{
                    var message = {
                        message:"Donor not found",
                        donorId:null

                    }
                    callback(null , message)
                }
            }
            )
}

module.exports.findUserById = function(userId , callback){
  Donor.findOne(
    {_id: userId } ,
    function(err , donor){
      if(err){
        callback(err , null)
      }
      else if(donor){
        var message = {
            message:"Donor found",
            donor:donor
        }
        callback(null , message)
      }
      else{
        var message = {
            message:"Donor not found",
            donor:null
        }
        callback(null , message)
      }
    }
  )
}
