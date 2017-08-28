var jwt = require('jsonwebtoken');
var env = require('../../env')

module.exports = function(req,res,next) {
  console.log(req.session);
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token || req.session.accessToken;
  // console.log(token);
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, env.SECRET , function(err, decoded) {
            if (err) { //failed verification.
                return res.json({"error": true , "message": "Token cant be verified"});
            }
            req.decoded = decoded;
            console.log("Token successfully verified");
            next(); //no error, proceed
        });
    } else {
//        console.log(token)
        // forbidden without token
        return res.status(403).send({
            "error": true,
            "message":"Token not found"
        });
    }
}
