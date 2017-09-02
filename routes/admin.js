//routes accessible only to admins
var express = require('express')
var router = express.Router();
var verifyToken = require('../app/middleware/verifyToken')
var Donation = require('../app/models/donation')
var Donor = require('../app/models/donor')
var User = require('../app/models/user')

//middleware to protect routes
router.use(function(req,res,next){
  verifyToken(req , res , next)
});

//Welcome Route
router.get('/' , function(req, res, next){
  res.send({"message": "Hey there, Admin"});
})

//ReSTful routes

//Resource donation
router.route('/donation')
.post(function(req, res){
  var newDonation = new Donation;

  newDonation.donorId = req.body.donorId
  newDonation.hospitalId = req.body.hospitalId
  newDonation.dateOfDonation = req.body.dateOfDonation
  newDonation.typeOfDonation = req.body.typeOfDonation

  var lastDonation = {
    typeOfDonation: req.body.typeOfDonation,
    dateOfDonation: req.body.dateOfDonation
  }

  var callback = function(err , message){
    if(err){
      let message = {
        "message": "Some error occured."
      }
      throw err;
      res.send(message)
    }
    else{
      let message = {
        "message": "New donation was successfully registered",
        "Donoation": newDonation
      }
      res.send(message)
    }
  }
  Donor.updateLastDonation(newDonation.donorId , lastDonation);
  Donation.createDonation(newDonation , callback);
})

//Resource Donor
router.route('/donor')
.post(function(req , res){
  var newDonor = new Donor();
  newDonor.name = req.body.name
  newDonor.mobileNumber = req.body.mobileNumber
  newDonor.place = req.body.place
  newDonor.email = req.body.email
  newDonor.bloodGroup = req.body.bloodGroup
  newDonor.donorId = req.body.donorId
  newDonor.organisation = req.body.organisation

  var callback = function(err , newDonor){
    if(err){
      let message = {
        "message": "Some error occured."
      }
      throw err;
      res.send(message)
    }
    else{
      let message = {
        "message": "New donor was successfully created",
        "Donor": newDonor
      }
      res.send(message)

    }
  }
  Donor.createDonor(newDonor , callback);
})
.get(function(req, res){
  var callback = function(err , donors){
    if(err){
      let message = {
        "message": "Some error occured."
      }
      throw err;
      res.send(message)
    }
    else{
      let message = {
        "message": "Donors were successfully returned",
        "Donors": donors
      }
      res.send(message)

    }
  }
  Donor.getDonors(callback);
})

router.get('/donors/:id' , function(req, res){
  var callback = function(err , message){
    if(err)
    throw err;

    if(message)
    res.send(message)
  }
  Donor.findDonorById(req.params.id , callback);
})

router.post('/findDonorById' , function(req , res){
  var DonorId = req.body.donorId
  var callback = function(err , message){
    if(err)
    throw err;

    if(message)
    res.send(message)

  }
  Donor.findDonorById(DonorId , callback);
})

router.post('/findDonorByMobileNumber' , function(req, res){
  var mobileNumber = req.body.mobileNumber;
  var callback = function(err , message){
    if(err)
    throw err;

    if(message)
    res.send(message)
  }
  Donor.findDonorByMobileNumber(mobileNumber , callback);
})

module.exports = router;
