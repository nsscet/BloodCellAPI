var express = require('express')
var router = express.Router()
var verifyToken = require('../app/middleware/verifyToken')
var allowAccess = require('../app/middleware/allowAccess')
var Hospitals = require('../app/models/hospital')

router.use(
    function(req, res, next) {
        verifyToken(req, res, next)
        allowAccess(req, res, next, 'donor')
    }
)

router.route('/hospital')
    .get(function(req, res) {
        var callback = (err, hospitals) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'Cannot get results. Try again'
                })
            } else {
                if (hospitals.length > 0) {
                    res.send({
                        count: hospitals.length,
                        success: true,
                        hospitals,
                        message: 'Hospitals successfully returned'
                    })
                } else {
                    res.send({
                        count: hospitals.length,
                        success: false,
                        message: 'No hospitals found'
                    })
                }
            }
        }
        Hospitals.getHospitals(req.query, callback)

    }).post(function(req, res) {

        var newhospital = new Hospitals()
        newhospital.name = req.body.name
        newhospital.district = req.body.district
        newhospital.address = req.body.address
        newhospital.contactNo = req.body.contactNo
        var callback = (err, newhospital) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'Some error occured',
                    error: err
                })
            } else {
                res.send({
                    success: true,
                    message: 'Hospital successfully created',
                    newhospital
                })
            }
        }
        Hospitals.createHospital(newhospital, callback)
    })

module.exports = router