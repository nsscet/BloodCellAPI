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
      if(data[0] != '' && data[1] != '' && data[4] != '' &&data[6]!=''&&data[8]!=''){
      newDonor.name = data[0]
      newDonor.mobileNumber = data[1]
      newDonor.place = data[2]
      if(data[2] == '')
        newDonor.place = 'null'
      newDonor.email = data[3]
      if(data[3] == '')
        newDonor.email = 'null'
      newDonor.bloodGroup = data[4]
      newDonor.donorId = data[5]
      if(data[5] == '')
        newDonor.donorId = 'null'
      newDonor.organisation = data[6]
      if(data[7] == '' || isNaN(data[7]))
        newDonor.year_joined = 0
      else
        newDonor.year_joined = Number(data[7])

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
      Donor.createDonor(newDonor, callback)}
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
