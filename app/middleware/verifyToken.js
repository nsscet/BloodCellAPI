var jwt = require('jsonwebtoken');
var env = require('../../env')

module.exports = function(req,res,next) {
  console.log(req.session);
  var token =  req.session.accessToken || req.body.token || req.query.token || req.params.token;
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, env.SECRET , function(err, decoded) {
            if (err) { //failed verification.
                return res.json({"error": true , "message": "Token cant be verified"});
            }
        });
    } else {
        return res.status(403).send({
            "error": true,
            "message":"Token not found"
        });
    }
}
