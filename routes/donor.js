// routes accessible only to admins
var express = require('express')
var router = express.Router()
var verifyToken = require('../app/middleware/verifyToken')
var allowAccess = require('../app/middleware/allowAccess')
var Donor = require('../app/models/donor')

// middleware to protect routes
router.use(function (req, res, next) {
  verifyToken(req, res, next)
  allowAccess(req, res, next, 'donor')
})

router.route('/donor')
  .post(function (req, res) {
    var newDonor = new Donor()
    newDonor.name = req.body.name
    newDonor.mobileNumber = req.body.mobileNumber
    newDonor.place = req.body.place
    newDonor.email = req.body.email
    newDonor.bloodGroup = req.body.bloodGroup
    newDonor.donorId = req.body.donorId
    newDonor.organisation = req.body.organisation
    newDonor.dateAdded = new Date().setHours(0, 0, 0, 0)
    newDonor.year_joined = req.body.yearOfJoin
    newDonor.branch = req.body.branch
    var callback = function (err, newDonor) {
      if (err) {
        let message = {
          'message': 'Some error occured.',
          'err':err
        }
        res.send(message)
      } else {
        let message = {
          'message': 'New donor was successfully created',
          'Donor': newDonor,
          'err': 'No Error'
        }
        res.send(message)
      }
    }
    Donor.createDonor(newDonor, callback)
  })
  .get(function (req, res) {
    var query = req.query
    if (req.session.user.role == 'organisation') {
      query.organisation = req.session.user.name
    }
    if (query.dateAdded) { query.dateAdded = new Date(query.dateAdded).setHours(0, 0, 0, 0) }
    var callback = function (err, donors) {
      if (err) {
        let message = {
          'message': 'Some error occured.',
          'error':err
        }
        res.send(message)
      } else {
        let message = {
          count: donors.length,
          'message': 'Donors were successfully returned',
          'Donors': donors
        }
        res.send(message)
      }
    }
    Donor.getDonors(query, callback)
  }).put(function(req,res){
    var query = {}
    query.mobileNumber = req.body.mobileNo
    query.remark = req.body.remark
    var callback = function (err) {
      if (err) {
        let message = {
          'message': 'Some error occured.',
          'status':err
        }
        res.send(message)
      } else {
        let message = {
          'message': 'Remarks Were Updated',
          'status':'Success'
        }
        res.send(message)
      }
    }

    Donor.updateRemarks(query,callback)
  })

module.exports = router
