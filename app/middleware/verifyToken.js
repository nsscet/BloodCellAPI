var jwt = require('jsonwebtoken');
var env = require('../../env')

module.exports = function(req,res,next) {
  var token =  req.session.accessToken || req.body.token || req.query.token || req.params.token;
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, env.SECRET , function(err, decoded) {
            if (err) { //failed verification.
                return res.json({"error": true , "message": "Token cant be verified"});
            }
            // req.decoded = decoded
            // console.log(decoded.role);
            // // console.log(req.decoded);
            // console.log("Token successfully verified");
            // next(); //no error, proceed
        });
    } else {
        return res.status(403).send({
            "error": true,
            "message":"Token not found"
        });
    }
}
