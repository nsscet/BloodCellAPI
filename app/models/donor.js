var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var DonorSchema = new Schema({
  donorId: {
    type: String,
    unique:true,
    required: true
  },
  name: {
    type:String,
    required:true
  },
  mobileNumber: {
    type:Number,
    unique:true,
    required:true
  },
  place: {
    type:String,
    required:true
  },
  email: {
    type:String,
    unique:true
  },
  bloodGroup: {
    type:String,
    required:true
  }
})

var Donor = module.exports = mongoose.model('Donor' , DonorSchema);

module.exports.createDonor = function(newDonor , callback){
  newDonor.save((err) => {
    if(err){
      callback(err , null)
    }
    else
      callback(null , newDonor)
  })
}

module.exports.findDonorByMobileNumber = function(mobileNumber , callback){
  console.log("inside findDonorByMobileNumber");
  Donor.findOne(

    {mobileNumber:mobileNumber} ,

    function(err , donor){
    if(err){
      callback(err, null);
    }
    else if (donor) {
      var message = {
        message: "Existing Donor",
        donor: donor
      }
      callback(null , message)
    }
    else{
      var message = {
        message: "New Donor",
        donor: null
      }
      callback(null , message)
    }
  })
}

module.exports.findDonorByUsername = function(username , callback){
    Donor.findOne(
            {username: username},
            function(err , donor){
                if(err)
                    callback(err , null)
                else if(donor){
                    var message = {
                        message:"Donor exists",
                        donor: donor
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

module.exports.findDonorById = function(Donor , callback){
  Donor.findOne(
    {_id: Donor } ,
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
