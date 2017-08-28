//routes accessible only to admins
var express = require('express')
var router = express.Router();
var verifyToken = require('../app/middleware/verifyToken')
var Donation = require('../app/models/donation')
var Donor = require('../app/models/donor')
var User = require('../app/models/user')

//middleware to protect routes
router.use(function(req,res,next){
  // console.log("token is " , req.session);
  verifyToken(req , res , next)
});

router.get('/' , function(req, res, next){
  res.send({"message": "Hey there, Admin"});
})

router.route('/donation')
  .post(function(req, res){
    var newDonation = new Donation;

    newDonation.donorId = req.body.donorId
    newDonation.hospitalId = req.body.hospitalId
    newDonation.dateOfDonation = req.body.dateOfDonation
    newDonation.typeOfDonation = req.body.typeOfDonation

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
          "Donor": newDonation
        }
        res.send(message)
      }

    }
    Donation.createDonation(newDonation , callback);
  })


router.route('/donor')
  .post(function(req , res){
    var newDonor = new Donor();
    newDonor.name = req.body.name
    newDonor.mobileNumber = req.body.mobileNumber
    newDonor.place = req.body.place
    newDonor.email = req.body.email
    newDonor.bloodGroup = req.body.bloodGroup
    newDonor.donorId = req.body.donorId

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

      // res.send({
      //   message:"Donor created"
      // })

    }
    Donor.createDonor(newDonor , callback);
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
    // console.log("Cookie exists " , req.cookie);
    // console.log(req);
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
