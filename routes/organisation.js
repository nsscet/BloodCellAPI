var fs = require('fs')
var csv = require('fast-csv')
var multer = require('multer')
var upload = multer(
  {
    dest: 'uploads',
    filename: 'data'
  })

var express = require('express')
var router = express.Router()

var Organisation = require('../app/models/organisation')
var Donor = require('../app/models/donor')

var newDonor = new Donor()

var verifyToken = require('../app/middleware/verifyToken')
var allowAccess = require('../app/middleware/allowAccess')

router.use(function (req, res, next) {
  verifyToken(req, res, next)
  allowAccess(req, res, next, 'organisation')
})

router.post('/upload', upload.single('file'), function (req, res) {
  var stream = fs.createReadStream(req.file.path)
  var csvStream = csv()
    .on('data', function (data) {
      var newDonor = new Donor()
      newDonor.name = data[0]
      newDonor.mobileNumber = data[1]
      newDonor.place = data[2]
      newDonor.email = data[3]
      newDonor.bloodGroup = data[4]
      newDonor.donorId = data[5]
      newDonor.organisation = data[6]
      newDonor.year_joined = data[7]
      newDonor.branch = data[8]

      var callback = function (err, newDonor) {
        if (err) {
          let message = {
            'message': 'Some error occured.'
          }
          throw err
          res.send(message)
        }
      }
      Donor.createDonor(newDonor, callback)
    })
    .on('end', function () {
      console.log('done')
      res.send({
        message: 'Successfully added all donors',
        success: true
      })
    })

  stream.pipe(csvStream)
})

module.exports = router
