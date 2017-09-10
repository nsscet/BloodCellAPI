var fs = require('fs')
var csv = require('fast-csv')
var express = require('express')
var router = express.Router();
var Organisation = require('../app/models/organisation')
var Donor = require('../app/models/donor')

var newDonor = new Donor()

var verifyToken = require('../app/middleware/verifyToken');
var allowAccess = require('../app/middleware/allowAccess');

router.use(function(req,res,next){
  console.log("Hello");
  verifyToken(req , res , next)
  allowAccess(req, res, next, 'organisation')
});

router.get('/upload', function(req, res){
  var stream = fs.createReadStream("org.csv");
  var csvStream = csv()
      .on("data", function(data){
        var newDonor = new Donor();
        newDonor.name = data[0]
        newDonor.mobileNumber = data[1]
        newDonor.place = data[2]
        newDonor.email = data[3]
        newDonor.bloodGroup = data[4]
        newDonor.donorId = data[5]
        newDonor.organisation = data[6]

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
      .on("end", function(){
           console.log("done");
      });

  stream.pipe(csvStream);
  // res.send("Unsuccessful")
})

module.exports = router
