
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

router.route('/getrequirements/donations')
    .get(function(req, res) {
        var callback = (err, requirements) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'Cannot get results. Try again'
                })
            } else {
                if (requirements.length > 0) {
                    requirementDonations = []
                   for(i=0;i<requirements.length;i++){
                    if(requirements[i].isClosed!=0)
                    for(j=0;j<requirements[i].children.length;j++){
                      console.log(requirements[i].children[j])
                      requirements[i].children[j].requirement=requirements[i].hospitalId+"-"+requirements[i].patientId+"-"+requirements[i].contactNo
                      requirementDonations.push(requirements[i].children[j])
                     }
                   }
                    console.log(requirementDonations)
                    res.send({
                        count: requirementDonations.length,
                        success: true,
                        requirementDonations,
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
