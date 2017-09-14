var express = require('express')
var router = express.Router()
var verifyToken = require('../app/middleware/verifyToken')
var allowAccess = require('../app/middleware/allowAccess')

router.use(
  function(req, res, next){
    verifyToken(req, res, next)
    allowAccess(req, res, next, 'requirement')
})

module.exports = router
