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
  organisation: {
    type:String
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
  },
  status: {
    type: String,
    default: "No status yet!!"
  },
  lastDonation: {
    typeOfDonation: {
      type: String
    },
    dateOfDonation: {
      type: String
    }
  },
  dateAdded: {
    type: String,
    default: new Date().setHours(0,0,0,0)
  }
})

var Donor = module.exports = mongoose.model('Donor', DonorSchema);

module.exports.createDonor = function(newDonor, callback){
  newDonor.save((err) => {
    if(err){
      callback(err, null)
    }
    else
    callback(null, newDonor)
  })
}

module.exports.findDonorByMobileNumber = function(mobileNumber , callback){
  Donor.findOne(
    {
      mobileNumber:mobileNumber
    },

    function(err, donor){
      if(err){
        callback(err, null);
      }
      else if (donor) {
        var message = {
          message: "Existing Donor",
          donor: donor
        }
        callback(null, message)
      }
      else{
        var message = {
          message: "New Donor",
          donor: null
        }
        callback(null, message)
      }
    })
  }

  module.exports.findDonorByUsername = function(username , callback){
    Donor.findOne(
      {username: username},
      function(err, donor){
        if(err)
        callback(err , null)
        else if(donor){
          var message = {
            message:"Donor exists",
            donor: donor
          }
          callback(null, message)
        }
        else{
          var message = {
            message:"Donor not found",
            donorId:null

          }
          callback(null, message)
        }
      }
    )
  }

  module.exports.findDonorById = function(id, callback){
    Donor.findOne(
      {
        donorId: id
      },
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

  module.exports.getDonors = function(query, callback){
    Donor.find(query, function(err , donors){
      if(err || !donors){
        callback(err , null)
      }
      else if(donors){
        callback(null , donors)
      }
    })
  }

  module.exports.updateLastDonation = function(donorId , lastDonation){
    var update = { lastDonation }
    Donor.findOneAndUpdate({ donorId }, update, function(err , donor){
      console.log(donor);
    })
  }
