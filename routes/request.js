var express = require('express')
var router = express.Router()
var verifyToken = require('../app/middleware/verifyToken')
var allowAccess = require('../app/middleware/allowAccess')
var Requirement = require('../app/models/requirement')


router.use(
  function(req, res, next){
    verifyToken(req, res, next)
    allowAccess(req, res, next, 'requirement')
  })

router.route('/requirements')
.get(function(req, res){
  var callback = (err, message) => {
    if(err)
    res.send({
      success: false,
      message: "Cannot get results. Try again"
    })
    else{
      res.send(message)
    }
  }
  Requirement.getRequirements(req.query, callback)
})
.post((req, res) => {
  var req = new Requirement
  req.hospitalId = req.body.hospitalId
  req.bloodGroup = req.body.bloodGroup
  req.quantity = req.body.quantity
  req.typeOfRequirement = req.body.typeOfRequirement
  req.patientId = req.body.patientId
  var callback = (err, requirements) => {
    if(err){
      throw err
      res.send({
        success: false,
        message: "Some error occured"
      })
    }

    else{
      if(requirements.length > 0){
        res.send({
          success: true,
          requirements,
          message: "Requirements successfully returned"
        })
      }
      else{
        res.send({
          success: false,
          message: "No requirements found"
        })
      }
    }
  }
  Requirement.addRequirement(req, callback)
})

  module.exports = router
