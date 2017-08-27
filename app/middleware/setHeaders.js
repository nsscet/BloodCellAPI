var env = require('../../env')

module.exports = function(req, res, next){

  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept')
  // console.log("Headers set");
  next()
}
