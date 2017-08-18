var jwt = require('jsonwebtoken');
var env = require('../../env')

module.exports = function(req,res,next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, env.SECRET , function(err, decoded) {
            if (err) { //failed verification.
                return res.json({"error": true});
            }
            req.decoded = decoded;
            res.send({message: "User authenticated"})
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        return res.status(403).send({
            "error": true,
            "message":"Token cant be verified"
        });
    }
}
