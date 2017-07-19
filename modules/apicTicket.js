var Rest = require('./api/rest');

class restReqeust extends Rest {

  multiply(a,b) { return a * b }
  divde(a,b) { return a / b }
  Test (a,b,c) {
    (a,b,c) => {
      new Rest(a,b,c)
    }
  }

}


module.exports = new restReqeust()
