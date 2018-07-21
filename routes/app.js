// routes accessible to application
var express = require('express')
var router = express.Router()
var verifyToken = require('../app/middleware/verifyToken')
var User = require('../app/models/user')

router.post('/login', function (req, res, next) {
  User.verifyCredentialsApp(req, res, next)
})

module.exports = router
