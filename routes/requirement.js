var express = require('express')
var router = express.Router()
var verifyToken = require('../app/middleware/verifyToken')
var allowAccess = require('../app/middleware/allowAccess')
var Requirement = require('../app/models/requirement')

router.use(
  function (req, res, next) {
    verifyToken(req, res, next)
    allowAccess(req, res, next, 'requirement')
  })

router.route('/requirements')
  .get(function (req, res) {
    var callback = (err, requirements) => {
      if (err) {
        res.send({
          success: false,
          message: 'Cannot get results. Try again'
        })
      } else {
        if (requirements.length > 0) {
          res.send({
            count: requirements.length,
            success: true,
            requirements,
            message: 'Requirements successfully returned'
          })
        } else {
          res.send({
            count: requirements.length,
            success: false,
            message: 'No requirements found'
          })
        }
      }
    }
    Requirement.getRequirements(req.query, callback)
  })
  .post((req, res) => {
    if(!(req.session.user.role === 'sadmin' || req.session.user.role === 'hospitals')){
      return res.status(304).send({
        message:'not authorised'
      })
    }
    var requirement = new Requirement()
    requirement.hospitalId = req.body.hospitalId
    requirement.bloodGroup = req.body.bloodGroup
    requirement.quantity = req.body.quantity
    requirement.typeOfRequirement = req.body.typeOfRequirement
    requirement.patientId = req.body.patientId
    requirement.remarks = req.body.remarks
    requirement.contactNo = req.body.contactNo
    var callback = (err, requirement) => {
      if (err) {
        throw err
        res.send({
          success: false,
          message: 'Some error occured'
        })
      } else {
        res.send({
          success: true,
          message: 'Requirement successfully created',
          requirement
        })
      }
    }
    Requirement.addRequirement(requirement, callback)
  }).put((req, res) => {
    console.log(req.body)
    var query = {hospitalId: req.body.hospitalId,
      bloodGroup: req.body.bloodGroup,
      typeOfRequirement: req.body.typeOfRequirement,
      patientId: req.body.patientId,
      timeOfPosting: req.body.timeOfPosting
    }
    var updatedValue = { $set: {isClosed: req.body.isClosed,
                                quantity: req.body.quantity,}
                        }
    var callback = (err) => {
      if (err) {
        res.send({
          success: false,
          message: 'Some error occured'
        })
      } else {
        res.send({
          success: true,
          message: 'Requirement Updated'
        })
      }
    }
    Requirement.updateRequirement(query, updatedValue, callback)
  })

module.exports = router
