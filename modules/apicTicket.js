var Rest = require('./api/rest');

class restReqeust extends Rest {

  multiply(a,b) { return a * b }
  divide(a,b) { return a / b }
  Rest.method = 'POST';
  console.log(REST);
}


module.exports = new restReqeust()
