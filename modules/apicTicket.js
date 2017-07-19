var Rest = require('./api/rest');

class restReqeust extends Rest {

  multiply(a,b) { return a * b }
  divde(a,b) { return a / b }

}


module.exports = new restReqeust()
