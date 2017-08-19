//routes accessible only to admins
var express = require('express')
var router = express.Router();
var verifyToken = require('../app/middleware/verifyToken')
var Donation = require('../app/models/donation')
var Donor = require('../app/models/donor')

//middleware to protect routes
router.use(function(req,res,next){
  verifyToken(req , res , next)
});

router.get('/' , function(req, res, next){
  // console.log("Hello");
  res.send({"message": "Hey there, Admin"});
})

router.route('/donation')
  .post(function(req, res){
    var newDonation = new Donation;
    newDonation.donorId = req.body.donorId
    newDonation.hospitalId = req.body.hospitalId
    newDonation.dateOfDonation = req.body.dateOfDonation
    var callback = function(err , message){
      if(err)
      throw err;

      if(message)
      res.send(message)

      if(newDonation){
        res.send({
          message:"Donation created" , donation:newDonation
        })
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
    var callback = function(err , message){
      if(err)
      throw err;

      if(message)
      res.send(message)

      if(newDonor){
        res.send({
          message:"Donor created" , donor:newDonor
        })
      }
    }

    Donor.createDonor(newDonor , callback);

  })
module.exports = router;
