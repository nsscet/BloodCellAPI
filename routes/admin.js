//routes accessible only to admins
var express = require('express')
var router = express.Router();
var verifyToken = require('../app/middleware/verifyToken')
var Donation = require('../app/models/donation')

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

module.exports = router;
