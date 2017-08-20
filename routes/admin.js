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

    }
    Donor.createDonor(newDonor , callback);
  })

  router.post('/findUserByMobileNumber' , function(req, res){
    var mobileNumber = req.body.mobileNumber;
    var callback = function(err , message){
      if(err)
      throw err;

      if(message)
      res.send(message)
    }
    Donor.findUserByMobileNumber(mobileNumber , callback);
  })


router.post('/isValidUsername' , function(req , res){
    var username = req.body.username;
    var callback = function(err, message){
        if(err)
            throw err;
        if(message)
            res.send(message)
    }
    User.findUserByUsername(username , callback)
})
module.exports = router;
