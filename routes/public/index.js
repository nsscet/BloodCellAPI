
var express = require('express')
var router = express.Router()
var Requirement = require('../../app/models/requirement')

router.route('/getrequirements')
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
module.exports = router
