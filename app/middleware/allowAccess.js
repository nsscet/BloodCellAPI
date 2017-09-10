var rbac = require('../../rbac')
var jwt = require('jsonwebtoken')
var env = require('../../env')

module.exports = (req, res, next, resource) => {
  var token =  req.session.accessToken || req.body.token || req.query.token || req.params.token;

  if (token) {

    jwt.verify(token, env.SECRET , function(err, decoded) {

      if (err) {
        return res.json({"error": true , "message": "Token cant be verified"});
      }

      else if(rbac.can(decoded.role, resource)){
        next();
      }

      else{
        return res.status(403).send({
          "error": true,
          "message":"Unauthorised"
        });
      }

    });
  }

  else {
    return res.status(403).send({
      "error": true,
      "message":"Token not found"
    });
  }
}
