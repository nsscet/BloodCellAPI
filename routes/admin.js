//routes accessible only to admins
var express = require('express')
var router = express.Router();
var verifyToken = require('../app/middleware/verifyToken')
//
router.use(function(req,res,next){
  verifyToken(req , res , next)
});

router.get('/' , function(req, res, next){
  // console.log("Hello");
  res.send({"message": "Hey there, Admin"});
})

module.exports = router;
