var express = require('express')
var router = express.Router();
var Donation = require('../app/models/donation')

var verifyToken = require('../app/middleware/verifyToken');

router.use(function(req,res,next){
  verifyToken(req , res , next)
});


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

module.exports = router
